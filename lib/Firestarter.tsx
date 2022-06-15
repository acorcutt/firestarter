import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Functions } from 'firebase/functions';
import { FirebaseStorage } from 'firebase/storage';
import React from 'react';
import { ReactNode } from 'react';
import { AuthProvider, FirestarterAuthSettings, FirestarterRouterType } from './Auth';
import { StorageProvider } from './FirebaseStorage';
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
  router,
  children,
}: {
  defaultStore?: any;
  firebase: FirestarterFirebase;
  settings?: { auth?: FirestarterAuthSettings };
  router?: FirestarterRouterType;
  children: ReactNode;
}) {
  const { app, auth, firestore, storage } = firebase;

  let wrapped = children;

  if (firestore) {
    wrapped = <FirestoreProvider firestore={firestore}>{wrapped}</FirestoreProvider>;
  }
  if (storage) {
    wrapped = <StorageProvider storage={storage}>{wrapped}</StorageProvider>;
  }
  if (auth) {
    wrapped = (
      <AuthProvider router={router} auth={auth} settings={settings?.auth}>
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
