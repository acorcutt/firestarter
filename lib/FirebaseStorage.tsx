import { createContext, ReactNode, useContext } from 'react';
import { FirebaseStorage } from 'firebase/storage';

const StorageContext = createContext<FirebaseStorage>(null as unknown as FirebaseStorage);

export function StorageProvider({ storage, children }: { storage: FirebaseStorage; children: ReactNode }) {
  if (!storage) {
    throw new Error('StorageProvider requires a FirebaseStorage instance');
  }
  return <StorageContext.Provider value={storage}>{children}</StorageContext.Provider>;
}

export const StorageConsumer = StorageContext.Consumer;

export function useStorage() {
  return useContext<FirebaseStorage>(StorageContext);
}
