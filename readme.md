#### ⚠️ Work-in-Progress

---

# Firestarter 🔥

React components, hooks and other helpers I use to quickly get started with next and firebase.

![alt text](public/firestarter.gif)

## Features

- Firebase Auth Connector
- Login with email link
- Firestore Connector
- Snapshot Hooks
- Local Store

## Install

```
pnpm add @acorcutt/firestarter
```

```
yarn add @acorcutt/firestarter
```

```
npm i @acorcutt/firestarter
```

## Usage

#### Setup providers with your firebaseConfig and optional emulator settings:

```js
import type { AppProps } from 'next/app';
import Firestarter, { getFirebase } from '@acorcutt/firestarter';

import config from '../firebase';
import settings from '../firebase.json';
import { getApp, initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { useRouter } from 'next/router';

// Set localStorage defaults
const defaultStore = {
  fire: true,
};

// Inject the firebase services you neeed
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

// Initialize the firebase app with optional emulators
const firebase = getFirebase(config, services, !!process.env.NEXT_PUBLIC_FIREBASE_EMULATION && settings.emulators);

function MyApp({ Component, pageProps }: AppProps) {
  // Connect to next routing
  const router = useRouter();

  return (
    <Firestarter firebase={firebase} defaultStore={defaultStore} router={router}>
      <Component {...pageProps} />
    </Firestarter>
  );
}

export default MyApp;
```

#### See included `/pages` folder for examples.

## Develop

To run the development app setup your `.firebaserc` and `.env.local` from your firebase project settings.

`.firebaserc`

```json
{
  "projects": {
    "default": "<your-project-name>"
  }
}
```

`.env.local`

Copy from your firebase project settings:

```env
NEXT_PUBLIC_FIREBASE_API=<apiKey>
NEXT_PUBLIC_FIREBASE_AUTH=<authDomain>
NEXT_PUBLIC_FIREBASE_PROJECT=<projectId>
NEXT_PUBLIC_FIREBASE_STORAGE=<storageBucket>
NEXT_PUBLIC_FIREBASE_MESSAGING=<messagingSenderId>
NEXT_PUBLIC_FIREBASE_APP=<appId>
```

To enable emulation:

```
NEXT_PUBLIC_FIREBASE_EMULATION=true
```
