// Connect or Initialize Firebase in a way that does not break when hot-reloaded
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator, Functions } from 'firebase/functions';

let app: FirebaseApp, firestore: Firestore, auth: Auth, storage: FirebaseStorage, functions: Functions;

export function getFirebase(config: any, emulators?: any) {
  try {
    // This will throw an error if app is not initialized
    app = getApp(config.projectId || 'firestarter');
    firestore = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    functions = getFunctions(app);

    console.log('Firebase Connected');
  } catch (_) {
    // Initialize Firebase once to prevent errors
    app = initializeApp(config, config.projectId || 'firestarter');
    firestore = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    functions = getFunctions(app);

    console.log('Firebase Initialized');

    if (emulators) {
      emulators.firestore && connectFirestoreEmulator(firestore, emulators.firestore.host || 'localhost', emulators.firestore.port || 8080);
      emulators.auth && connectAuthEmulator(auth, `http://${emulators.auth.host || 'localhost'}:${emulators.auth.port || 9099}`);
      emulators.storage && connectStorageEmulator(storage, emulators.storage.host || 'localhost', emulators.storage.port || 9199);
      emulators.functions && connectFunctionsEmulator(functions, emulators.functions.host || 'localhost', emulators.functions.port || 5001);
      console.log('Firebase Emulation is enabled');
    }
  }
  return { app, firestore, auth, storage, functions };
}
