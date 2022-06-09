import '../styles/globals.css';
import type { AppProps } from 'next/app';
import settings from '../firebase.json';
import Firestarter from '../lib/Firestarter';

const defaultStore = {
  fire: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Firestarter settings={settings} defaultStore={defaultStore}>
      <Component {...pageProps} />
    </Firestarter>
  );
}

export default MyApp;
