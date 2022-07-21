import settings from './firebase.json';
import { getApp, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirebase } from './lib/index';

console.log('emulation', process.env.NEXT_PUBLIC_FIREBASE_EMULATION);

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP,
};

const services = {
  getApp,
  initializeApp,
  getFirestore,
  getAuth,
  getStorage,
  getFunctions,
  connectFirestoreEmulator,
  connectAuthEmulator,
  connectStorageEmulator,
  connectFunctionsEmulator,
};

const firebase = getFirebase(config, services, !!process.env.NEXT_PUBLIC_FIREBASE_EMULATION && settings.emulators);
export default firebase;
