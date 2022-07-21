import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Firestarter from '../lib/Firestarter';

import { useRouter } from 'next/router';

import firebase from '../firebase';

const defaultStore = {
  fire: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Firestarter firebase={firebase} defaultStore={defaultStore} router={router}>
      <Component {...pageProps} />
    </Firestarter>
  );
}

export default MyApp;
