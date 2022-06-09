export { default as Firestarter } from './Firestarter';
export { default as cx } from './cx';

export {
  StoreProvider,
  useStore,
  // Subscribers
  useLocalState,
  usePageState,
  useSessionState,
  // Store Setter
  useLocalSetter,
  usePageSetter,
  useSessionSetter,
  // Store Getter
  useLocalGetter,
  usePageGetter,
  useSessionGetter,
  // Key Set
  useLocalSet,
  usePageSet,
  useSessionSet,
  // Key Get
  useLocalGet,
  usePageGet,
  useSessionGet,
  //
  emitters as storeEmitters,
} from './Store';

export { AuthProvider, useAuth, updateUserProfile } from './Auth';
export { useLogin } from './auth/login';
export { useLogout } from './auth/logout';
export { useVerify } from './auth/verify';

export { FirestoreProvider, useFirestore } from './Firestore';

export { default as useDocumentSnapshot } from './firestore/useDocumentSnapshot';
export { default as useQuerySnapshot } from './firestore/useQuerySnapshot';
export { default as useMemoState } from './firestore/useMemoState';
