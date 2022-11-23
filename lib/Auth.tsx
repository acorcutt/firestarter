import mitt from 'mitt';
import React, { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';
import { Auth, onAuthStateChanged, ParsedToken, updateProfile, User } from 'firebase/auth';
import deepEqual from 'fast-deep-equal';
import { UrlObject } from 'url';

export type Url = string | UrlObject;

export type FirestarterAuthSettings = {
  loginPath?: Url;
  logoutPath?: Url;
  verifyPath?: Url;
  actionPath?: Url;
  homePath?: Url;
  userPath?: Url;
};
export type FirestarterRouterType = {
  push: (url: Url) => void;
  replace: (url: Url) => void;
};

export type FirestarterAuthType = {
  currentUser: User | null;
  connected: boolean;
  auth: Auth | null;
  claims: ParsedToken | null;
  settings: FirestarterAuthSettings;
  router: FirestarterRouterType;
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

export const defaultRouter = {
  push: (url: Url) => {
    console.error('You must provide a router');
  },
  replace: (url: Url) => {
    console.error('You must provide a router');
  },
};

const AuthContext = createContext<FirestarterAuthType>({
  currentUser: null,
  claims: null,
  connected: false,
  auth: null,
  router: defaultRouter,
  settings: defaultAuthSettings,
});

const emitter = mitt<FirestarterProfileEvent>();

export function AuthProvider({
  auth,
  settings,
  router = defaultRouter,
  children,
}: {
  auth: Auth;
  router?: FirestarterRouterType;
  settings?: FirestarterAuthSettings;
  children: ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [claims, setClaims] = useState<ParsedToken | null>(null);

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
    // Auth claims
    if (currentUser) {
      currentUser.getIdTokenResult(false).then(({ claims }) => setClaims(claims));
    } else {
      setClaims(null);
    }

    // Listen for profile changes
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

  const value = { auth, currentUser, claims, connected, router, settings: { ...defaultAuthSettings, ...settings } };

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
