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
import firebaseConfig from '../firebase';
import settings from './firebase/settings.json';
import { getFirebase } from '../lib/firebase';

const firebase = getFirebase(firebaseConfig, settings.emulators);

<Firestarter firebase={firebase}>
  <App />
</Firestarter>;
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
NEXT_PUBLIC_FIREBASE_NAMESPACE=<your-project-name>
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
