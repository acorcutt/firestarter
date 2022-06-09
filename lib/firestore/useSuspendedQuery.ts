import { DocumentData, getDocs, onSnapshot, Query, queryEqual, QuerySnapshot, SnapshotListenOptions } from 'firebase/firestore';
import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import useMemoState from './useMemoState';

const cache: any[] = [];

let count = 0;
export default function useSuspendedQuery(query: Query, options?: SnapshotListenOptions): QuerySnapshot {
  if (count++ > 50) {
    throw new Error('Too many suspended queries');
  }

  // You really should not be sending in mutating objects but handle them if they are
  //const queryCache: Query = useMutatingObject(query, queryEqual);
  //const optionsCache: SnapshotListenOptions = useMutatingObject(options);

  //const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null);
  //const snapshotRef = useRef<QuerySnapshot | null>(null);

  const cached = cache.find(({ query: q }) => queryEqual(q, query));

  //const [isPending, startTransition] = useTransition();

  if (!cached) {
    console.log('new');
    const promise = getDocs(query).then((snapshot) => {
      //snapshotRef.current = snapshot;
      //console.log('snapshot', snapshotRef.current);

      // startTransition(() => {
      const cached = cache.find(({ query: q }) => queryEqual(q, query));
      if (cached) {
        cached.snapshot = snapshot;
      }
      //});

      return snapshot;
    });
    cache.push({ query: query, promise: promise, snapshot: null });
    throw promise;
  } else if (!cached.snapshot) {
    //} else if (!snapshotRef.current) {
    console.log('promise');
    throw cached.promise;
  } else {
    console.log('cached');

    //setSnapshot(cached.snapshot);

    return cached.snapshot;
  } // else {
  //   console.log('snapshot');

  //   return snapshot; // as QuerySnapshot;
  // }

  // const snapshotRef = useRef<QuerySnapshot | null>(null);

  // const promiseMemo = useMemo(() => {
  //   console.log('memo');
  //   return getDocs(queryCache).then((snapshot) => {
  //     snapshotRef.current = snapshot;
  //     return snapshot;
  //   });
  // }, [queryCache]);

  // if (!snapshotRef.current) {
  //   throw promiseMemo;
  // } else {
  //   return [snapshotRef.current, loaded];
  // }

  //const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null);
  //const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   console.log('useQuerySnapshot', 'update');
  //   setLoaded(false);

  //   if (queryCache) {
  //     const unsubscribe = onSnapshot(
  //       queryCache,
  //       optionsCache || {},
  //       (snapshot) => {
  //         setSnapshot(snapshot);
  //         setLoaded(true);
  //       },
  //       (error) => {
  //         console.error(error);
  //         throw error;
  //       }
  //     );
  //     return unsubscribe;
  //   }
  // }, [optionsCache, queryCache]);

  //return [snapshot, loaded];
}
