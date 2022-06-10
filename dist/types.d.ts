import { ReactNode, FormEventHandler } from "react";
import { Auth, User } from "firebase/auth";
import { Firestore, DocumentReference, DocumentSnapshot, SnapshotListenOptions, Query, QuerySnapshot } from "firebase/firestore";
import { StoreType } from "store2";
import { FirebaseApp } from "firebase/app";
import { Functions } from "firebase/functions";
import { FirebaseStorage } from "firebase/storage";
import cx from "clsx";
type FirestarterAuthSettings = {
    loginPath: string;
    logoutPath: string;
    verifyPath: string;
    actionPath: string;
    homePath: string;
    userPath: string;
};
type FirestarterAuthType = {
    currentUser: User | null;
    connected: boolean;
    auth: Auth | null;
    settings: FirestarterAuthSettings;
};
type FirestarterProfileType = {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
};
export function AuthProvider({ auth, settings, children }: {
    auth: Auth;
    settings?: FirestarterAuthSettings;
    children: ReactNode;
}): JSX.Element;
export function useAuth(): FirestarterAuthType;
/**
 * Update the user's profile and emit an event to all subscribers
 */
export function updateUserProfile(user: User, profile: FirestarterProfileType): void;
export function FirestoreProvider({ firestore, children }: {
    firestore: Firestore;
    children: ReactNode;
}): JSX.Element;
export function useFirestore(): Firestore;
type FirestarterStoreType = {
    store: StoreType;
    defaultValues?: {
        [key: string]: any;
    };
};
export function StoreProvider({ namespace, defaultValues, children, }: {
    namespace?: string;
    defaultValues?: object;
    children: ReactNode;
}): JSX.Element;
export function useStore(): FirestarterStoreType;
export const storeEmitters: {
    local: import("mitt").Emitter<Record<import("mitt").EventType, unknown>>;
    session: import("mitt").Emitter<Record<import("mitt").EventType, unknown>>;
    page: import("mitt").Emitter<Record<import("mitt").EventType, unknown>>;
};
export function useLocalState(key: string, defaultValue?: any): [any, Function, boolean];
export function useSessionState(key: string, defaultValue?: any): [any, Function, boolean];
export function usePageState(key: string, defaultValue?: any): [any, Function, boolean];
export function useLocalSetter(): (key: string, value: any) => void;
export function useSessionSetter(): (key: string, value: any) => void;
export function usePageSetter(): (key: string, value: any) => void;
export function useLocalGetter(): (key: string) => any;
export function useSessionGetter(): (key: string) => any;
export function usePageGetter(): (key: string) => any;
export function useLocalSet(key: string): (value: any) => void;
export function useSessionSet(key: string): (value: any) => void;
export function usePageSet(key: string): (value: any) => void;
export function useLocalGet(key: string): () => any;
export function useSessionGet(key: string): () => any;
export function usePageGet(key: string): () => any;
type FirestarterFirebase = {
    app: FirebaseApp;
    firestore?: Firestore;
    auth?: Auth;
    storage?: FirebaseStorage;
    functions?: Functions;
};
/**
 * A wrapper for the other providers.
 */
export function Firestarter({ defaultStore, firebase, children }: {
    defaultStore?: any;
    firebase: FirestarterFirebase;
    children: ReactNode;
}): JSX.Element;
enum FirestarterLoginStatus {
    Connecting = 0,
    Inputing = 1,
    Submitting = 2,
    Waiting = 3,
    Redirecting = 4
}
type FirestarterLoginState = {
    status: FirestarterLoginStatus;
    errors: any;
    currentUser: User | null;
    registerEmail: any;
    submitHandler: FormEventHandler<HTMLFormElement>;
    watchEmail: string;
    stopWaiting: () => void;
};
export function useLogin(): FirestarterLoginState;
enum FirestarterLogoutStatus {
    Connecting = 0,
    Redirecting = 1
}
export function useLogout(): FirestarterLogoutStatus;
enum FirestarterVerifyStatus {
    Connecting = 0,
    Inputing = 1,
    Submitting = 2,
    Waiting = 3,
    Redirecting = 4,
    LinkError = 5
}
type FirestarterVerifyState = {
    status: FirestarterVerifyStatus;
    errors: any;
    currentUser: User | null;
    registerEmail: any;
    submitHandler: FormEventHandler<HTMLFormElement>;
    watchEmail: string;
    stopWaiting: () => void;
};
export function useVerify(): FirestarterVerifyState;
/**
 * You really should not be using mutating objects but handle them if they are
 * @param {any} state
 * @param {(a: any, b: any) => boolean} [compareFn]
 *
 * @returns {any}
 */
export function useMemoState(state: any, compareFn?: (a: any, b: any) => boolean, warn?: boolean): any;
export function useDocumentSnapshot(docRef: DocumentReference | null, options?: SnapshotListenOptions): DocumentSnapshot<unknown> | null;
export function useQuerySnapshot(query: Query, options?: SnapshotListenOptions): QuerySnapshot | null;

//# sourceMappingURL=types.d.ts.map
