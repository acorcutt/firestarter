import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../Auth';

export enum FirestarterLogoutStatus {
  Connecting,
  Redirecting,
}

export function useLogout() {
  const { auth, currentUser, settings, connected } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      signOut(auth);
    }
  }, [auth]);

  useEffect(() => {
    if (connected && !currentUser) {
      router.replace(settings.homePath);
    }
  }, [connected, currentUser, router, settings.homePath]);

  return connected ? FirestarterLogoutStatus.Redirecting : FirestarterLogoutStatus.Connecting;
}
