import { ReactNode } from 'react';
import { AuthProvider } from './Auth';
import { getFirebase } from './firebase';
import { FirestoreProvider } from './Firestore';
import { StoreProvider } from './Store';

/**
 * A wrapper for the other providers.
 */
export default function Firestarter({ defaultStore, settings, children }: { defaultStore?: any; settings?: any; children: ReactNode }) {
  const { auth, firestore } = getFirebase(settings);

  return (
    <StoreProvider namespace={process.env.NEXT_PUBLIC_FIREBASE_NAMESPACE || 'firestarter'} defaultValues={defaultStore}>
      <AuthProvider auth={auth}>
        <FirestoreProvider firestore={firestore}>{children}</FirestoreProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
