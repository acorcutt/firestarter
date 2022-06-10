import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Firestarter from '../lib/Firestarter';
import { getFirebase } from '../lib/firebase';

import config from '../firebase';
import settings from '../firebase.json';

const defaultStore = {
  fire: true,
};

const firebase = getFirebase(config, !!process.env.NEXT_PUBLIC_FIREBASE_EMULATION && settings.emulators);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Firestarter firebase={firebase} defaultStore={defaultStore}>
      <Component {...pageProps} />
    </Firestarter>
  );
}

export default MyApp;
