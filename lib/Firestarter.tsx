import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Functions } from 'firebase/functions';
import { FirebaseStorage } from 'firebase/storage';
import { ReactNode } from 'react';
import { AuthProvider, FirestarterAuthSettings } from './Auth';
import { FirestoreProvider } from './Firestore';
import { StoreProvider } from './Store';

type FirestarterFirebase = {
  app: FirebaseApp;
  firestore?: Firestore;
  auth?: Auth;
  storage?: FirebaseStorage;
  functions?: Functions;
};

/**
 * A wrapper for the other providers.
 */
export default function Firestarter({
  defaultStore,
  firebase,
  settings,
  children,
}: {
  defaultStore?: any;
  firebase: FirestarterFirebase;
  settings?: { auth?: FirestarterAuthSettings };
  children: ReactNode;
}) {
  const { app, auth, firestore } = firebase;

  let wrapped = children;

  if (firestore) {
    wrapped = <FirestoreProvider firestore={firestore}>{wrapped}</FirestoreProvider>;
  }
  if (auth) {
    wrapped = (
      <AuthProvider auth={auth} settings={settings?.auth}>
        {wrapped}
      </AuthProvider>
    );
  }

  return (
    <StoreProvider namespace={app.name || 'firestarter'} defaultValues={defaultStore}>
      {wrapped}
    </StoreProvider>
  );
}
