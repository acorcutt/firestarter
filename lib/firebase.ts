// Connect or Initialize Firebase in a way that does not break when hot-reloaded
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator, Functions } from 'firebase/functions';
import { GetStaticProps } from 'next';

let app: FirebaseApp, firestore: Firestore | undefined, auth: Auth | undefined, storage: FirebaseStorage | undefined, functions: Functions | undefined;

type FirestarterFirebaseServices = {
  getApp: typeof getApp;
  initializeApp: typeof initializeApp;
  getFirestore?: typeof getFirestore;
  getAuth?: typeof getAuth;
  getStorage?: typeof getStorage;
  getFunctions?: typeof getFunctions;
  connectFirestoreEmulator?: typeof connectFirestoreEmulator;
  connectAuthEmulator?: typeof connectAuthEmulator;
  connectStorageEmulator?: typeof connectStorageEmulator;
  connectFunctionsEmulator?: typeof connectFunctionsEmulator;
};

export function getFirebase(config: any, services: FirestarterFirebaseServices, emulators?: any) {
  try {
    // This will throw an error if app is not initialized
    app = services.getApp(config.projectId || 'firestarter');
    firestore = services.getFirestore?.(app);
    auth = services.getAuth?.(app);
    storage = services.getStorage?.(app);
    functions = services.getFunctions?.(app);

    console.log('Firebase Connected');
  } catch (_) {
    // Initialize Firebase once to prevent errors
    app = services.initializeApp(config, config.projectId || 'firestarter');
    firestore = services.getFirestore?.(app);
    auth = services.getAuth?.(app);
    storage = services.getStorage?.(app);
    functions = services.getFunctions?.(app);

    console.log('Firebase Initialized');

    if (emulators) {
      firestore &&
        emulators.firestore &&
        services.connectFirestoreEmulator?.(firestore, emulators.firestore.host || 'localhost', emulators.firestore.port || 8080);
      auth && emulators.auth && services.connectAuthEmulator?.(auth, `http://${emulators.auth.host || 'localhost'}:${emulators.auth.port || 9099}`);
      storage && emulators.storage && services.connectStorageEmulator?.(storage, emulators.storage.host || 'localhost', emulators.storage.port || 9199);
      functions &&
        emulators.functions &&
        services.connectFunctionsEmulator?.(functions, emulators.functions.host || 'localhost', emulators.functions.port || 5001);
      console.log('Firebase Emulation is enabled');
    }
  }
  return { app, firestore, auth, storage, functions };
}
