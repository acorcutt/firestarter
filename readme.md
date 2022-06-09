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

- Check the included next.js app

## Develop

To run the app setup your `.firebaserc` and `.env.local` from your firebase project settings.

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

To enable emulation specify a hostname:

```
NEXT_PUBLIC_FIREBASE_EMULATION=localhost
```

#### Give Firestarter your Firebase `settings.json` to connect emulators

```js
import settings from './firebase/settings.json';

<Firestarter settings={settings}>
  <App />
</Firestarter>;
```
