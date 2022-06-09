import { DocumentData, getDocs, onSnapshot, Query, queryEqual, QuerySnapshot, SnapshotListenOptions } from 'firebase/firestore';
import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import useMemoState from './useMemoState';
import { startTransition } from 'react';
type SuspendedQueryCache = {
  query: Query;
  promise: Promise<QuerySnapshot>;
  snapshot: QuerySnapshot | null;
};
const cache: SuspendedQueryCache[] = [];

let count = 0;
export default function useSuspendedSnapshotQuery(query: Query, options?: SnapshotListenOptions): QuerySnapshot {
  if (count++ > 50) {
    throw new Error('Too many suspended queries');
  }

  console.log('query');

  // You really should not be sending in mutating objects but handle them if they are
  const queryMemo: Query = useMemoState(query, queryEqual);
  const optionsMemo: SnapshotListenOptions = useMemoState(options);

  const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null);

  const cachedMemo = useMemo(() => {
    const cached = cache.find(({ query }) => queryEqual(query, queryMemo));
    if (cached) {
      console.log('cached');
      return cached;
    } else {
      console.log('suspend');
      const suspended: SuspendedQueryCache = {
        query: queryMemo,
        promise: getDocs(queryMemo)
          .then((snapshot) => {
            console.log('execute');

            const cached = cache.find(({ query }) => queryEqual(query, queryMemo));
            if (cached) {
              startTransition(() => {
                cached.snapshot = snapshot;
                setSnapshot(snapshot);
                console.log('store');
              });
            }
            return snapshot;
          })
          .catch((error) => {
            console.error('execute error', error);
            throw error;
          }),
        snapshot: null,
      };
      cache.push(suspended);
      return suspended;
    }
  }, [queryMemo]);

  if (snapshot) {
    console.log('state');
    return snapshot;
  } else if (cachedMemo.snapshot) {
    console.log('snapshot');
    return cachedMemo.snapshot;
  } else if (cachedMemo.promise) {
    console.log('promise');
    throw cachedMemo.promise;
  } else {
    throw 'query error';
  }
}
