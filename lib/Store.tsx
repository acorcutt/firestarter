import mitt from 'mitt';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useEffect, useState } from 'react';
import store2, { StoreType } from 'store2';

export type FirestarterStoreType = {
  store: StoreType;
  defaultValues?: { [key: string]: any };
};

const StoreContext = createContext<FirestarterStoreType>({ store: store2, defaultValues: {} });

export function StoreProvider({ namespace, defaultValues = {}, children }: { namespace: string; defaultValues?: object; children: ReactNode }) {
  const store = store2.namespace(namespace);
  const value = { store, defaultValues };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const StoreConsumer = StoreContext.Consumer;

export function useStore() {
  return useContext<FirestarterStoreType>(StoreContext);
}

// Emitters
export const emitters = {
  local: mitt(),
  session: mitt(),
  page: mitt(),
};

function useStoreState(location: 'local' | 'session' | 'page', key: string, defaultValue?: any): [any, Function, boolean] {
  const { store, defaultValues } = useStore();

  const [value, setValue] = useState(defaultValue || (defaultValues && defaultValues[key]));
  const [loaded, setLoaded] = useState(false);

  function set(value: any) {
    store[location].set(key, value);
    emitters[location].emit(key, value);
  }

  useEffect(() => {
    // Must set the value in an effect else the server will never match the client on the 1st render
    setValue(store[location].get(key, defaultValue || (defaultValues && defaultValues[key])));

    // You can use the loaded state if you need to wait for the store data
    setLoaded(true);
  }, [defaultValue, defaultValues, key, location, store]);

  useEffect(() => {
    function onValueUpdate() {
      setValue(store.get(key, defaultValue));
    }

    emitters[location].on(key, onValueUpdate);

    return () => {
      emitters[location].off(key, onValueUpdate);
    };
  }, [defaultValue, key, location, store]);

  return [value, set, loaded];
}

function useStoreSetter(location: 'local' | 'session' | 'page') {
  const { store } = useStore();

  function set(key: string, value: any) {
    store[location].set(key, value);
    emitters[location].emit(key, value);
  }

  return useCallback(set, [location, store]);
}

function useStoreGetter(location: 'local' | 'session' | 'page') {
  const { store } = useStore();

  function get(key: string) {
    return store[location].get(key);
  }

  return useCallback(get, [location, store]);
}

function useStoreSet(location: 'local' | 'session' | 'page', key: string) {
  const { store } = useStore();

  function set(value: any) {
    store[location].set(key, value);
    emitters[location].emit(key, value);
  }

  return useCallback(set, [key, location, store]);
}

function useStoreGet(location: 'local' | 'session' | 'page', key: string) {
  const { store } = useStore();

  function get() {
    return store[location].get(key);
  }

  return useCallback(get, [key, location, store]);
}

export function useLocalState(key: string, defaultValue?: any): [any, Function, boolean] {
  return useStoreState('local', key, defaultValue);
}

export function useSessionState(key: string, defaultValue?: any): [any, Function, boolean] {
  return useStoreState('session', key, defaultValue);
}

export function usePageState(key: string, defaultValue?: any): [any, Function, boolean] {
  return useStoreState('page', key, defaultValue);
}

export function useLocalSetter() {
  return useStoreSetter('local');
}

export function useSessionSetter() {
  return useStoreSetter('session');
}

export function usePageSetter() {
  return useStoreSetter('page');
}

export function useLocalGetter() {
  return useStoreGetter('local');
}

export function useSessionGetter() {
  return useStoreGetter('session');
}

export function usePageGetter() {
  return useStoreGetter('page');
}

export function useLocalSet(key: string) {
  return useStoreSet('local', key);
}

export function useSessionSet(key: string) {
  return useStoreSet('session', key);
}

export function usePageSet(key: string) {
  return useStoreSet('page', key);
}

export function useLocalGet(key: string) {
  return useStoreGet('local', key);
}

export function useSessionGet(key: string) {
  return useStoreGet('session', key);
}

export function usePageGet(key: string) {
  return useStoreGet('page', key);
}
