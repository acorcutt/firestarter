import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuth, defaultAuthSettings } from '../Auth';

export enum FirestarterLogoutStatus {
  Connecting,
  Redirecting,
}

export function useLogout() {
  const { auth, currentUser, settings, connected, router } = useAuth();

  useEffect(() => {
    if (auth) {
      signOut(auth);
    }
  }, [auth]);

  useEffect(() => {
    if (connected && !currentUser) {
      router.push(settings.homePath || defaultAuthSettings.homePath);
    }
  }, [connected, currentUser, router, settings.homePath]);

  return connected ? FirestarterLogoutStatus.Redirecting : FirestarterLogoutStatus.Connecting;
}
