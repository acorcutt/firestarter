import mitt from 'mitt';
import { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';
import { Auth, onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import deepEqual from 'fast-deep-equal';
import { UrlObject } from 'url';
type Url = string | UrlObject;

export type FirestarterAuthSettings = {
  loginPath?: Url;
  logoutPath?: Url;
  verifyPath?: Url;
  actionPath?: Url;
  homePath?: Url;
  userPath?: Url;
};

export type FirestarterAuthType = {
  currentUser: User | null;
  connected: boolean;
  auth: Auth | null;
  settings: FirestarterAuthSettings;
};

export type FirestarterProfileType = {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
};

export const defaultAuthSettings = {
  homePath: '/',
  loginPath: '/login',
  logoutPath: '/logout',
  verifyPath: '/verify',
  actionPath: '/action',
  userPath: '/user',
};

type FirestarterProfileEvent = {
  authProfileUpdate: User;
};

const AuthContext = createContext<FirestarterAuthType>({ currentUser: null, connected: false, auth: null, settings: defaultAuthSettings });

const emitter = mitt<FirestarterProfileEvent>();

export function AuthProvider({ auth, settings, children }: { auth: Auth; settings?: FirestarterAuthSettings; children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [connected, setConnected] = useState(Boolean(auth.currentUser));
  const [update, setUpdate] = useState({});
  function forceUpdate() {
    setUpdate({});
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser((currentUser) => {
        // React will not re-render if the setState is the same object
        // So deep check if the user from auth subscription is the same to prevent re-render
        if (!deepEqual(currentUser, user)) {
          return user;
        } else {
          return currentUser;
        }
      });

      setConnected(true);
    });
    return unsubscribeAuth;
  }, [auth]);

  useEffect(() => {
    function onProfileUpdate(user: User) {
      // Firebase does not mutate user on profile updates so force an update
      if (user === currentUser) {
        forceUpdate();
      }
    }

    emitter.on('authProfileUpdate', onProfileUpdate);

    return () => {
      emitter.off('authProfileUpdate', onProfileUpdate);
    };
  }, [currentUser]);

  const value = { auth, currentUser: currentUser, connected, settings: { ...defaultAuthSettings, ...settings } };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export function useAuth() {
  return useContext<FirestarterAuthType>(AuthContext);
}

/**
 * Update the user's profile and emit an event to all subscribers
 */
export function updateUserProfile(user: User, profile: FirestarterProfileType) {
  updateProfile(user, profile)
    .then(() => {
      emitter.emit('authProfileUpdate', user);
    })
    .catch((error) => {
      throw error;
    });
}
