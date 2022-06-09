import { createContext, ReactNode, useContext } from 'react';
import { Firestore } from 'firebase/firestore';

const FirestoreContext = createContext<Firestore>(null as unknown as Firestore);

export function FirestoreProvider({ firestore, children }: { firestore: Firestore; children: ReactNode }) {
  if (!firestore) {
    throw new Error('FirestoreProvider requires a Firestore instance');
  }
  return <FirestoreContext.Provider value={firestore}>{children}</FirestoreContext.Provider>;
}

export const FirestoreConsumer = FirestoreContext.Consumer;

export function useFirestore() {
  return useContext<Firestore>(FirestoreContext);
}
