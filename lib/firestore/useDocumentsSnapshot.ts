import { onSnapshot, Query, queryEqual, QuerySnapshot, SnapshotListenOptions } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useMemoState from './useMemoState';

export default function useDocumentsSnapshot(query: Query | null, options?: SnapshotListenOptions): QuerySnapshot | null {
  // You really should not be sending in mutating objects but handle them if they are
  const queryMemo: Query = useMemoState(query, queryEqual);
  const optionsMemo: SnapshotListenOptions = useMemoState(options);

  const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null);

  useEffect(() => {
    if (queryMemo) {
      const unsubscribe = onSnapshot(
        queryMemo,
        optionsMemo || {},
        (snapshot) => {
          setSnapshot(snapshot);
        },
        (error) => {
          console.error(error);
          throw error;
        }
      );
      return unsubscribe;
    } else {
      setSnapshot(null);
    }
  }, [optionsMemo, queryMemo]);

  return snapshot;
}
