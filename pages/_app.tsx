import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Firestarter from '../lib/Firestarter';
import { getFirebase } from '../lib/firebase';

import config from '../firebase';
import settings from '../firebase.json';
import { getApp, initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { useRouter } from 'next/router';

const defaultStore = {
  fire: true,
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

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Firestarter firebase={firebase} defaultStore={defaultStore} router={router}>
      <Component {...pageProps} />
    </Firestarter>
  );
}

export default MyApp;
