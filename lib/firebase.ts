// Connect or Initialize Firebase in a way that does not break when hot-reloaded
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP,
};

let firebase: FirebaseApp, firestore: Firestore, auth: Auth, storage: FirebaseStorage;

export function getFirebase(settings?: any) {
  try {
    // This will throw an error if app is not initialized
    firebase = getApp(process.env.NEXT_PUBLIC_FIREBASE_PROJECT || 'firestarter');
    firestore = getFirestore(firebase);
    auth = getAuth(firebase);
    storage = getStorage(firebase);
    console.log('Firebase Connected');
  } catch (_) {
    // Initialize Firebase once to prevent errors
    firebase = initializeApp(firebaseConfig, process.env.NEXT_PUBLIC_FIREBASE_PROJECT || 'firestarter');
    firestore = getFirestore(firebase);
    auth = getAuth(firebase);
    storage = getStorage(firebase);

    console.log('Firebase Initialized');

    if (!!process.env.NEXT_PUBLIC_FIREBASE_EMULATION && settings?.emulators) {
      connectFirestoreEmulator(firestore, process.env.NEXT_PUBLIC_FIREBASE_EMULATION, settings.emulators?.firestore?.port);
      connectAuthEmulator(auth, `http://${process.env.NEXT_PUBLIC_FIREBASE_EMULATION}:${settings.emulators?.auth?.port}`);
      connectStorageEmulator(storage, process.env.NEXT_PUBLIC_FIREBASE_EMULATION, settings.emulators?.storage?.port);
      console.log('Firebase Emulation is enabled');
    }
  }
  return { firebase, firestore, auth, storage };
}
