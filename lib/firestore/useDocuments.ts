import { getDocs, Query, queryEqual, QuerySnapshot, SnapshotListenOptions } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useMemoState from './useMemoState';

export default function useDocuments(query: Query | null): QuerySnapshot | null {
  // You really should not be sending in mutating objects but handle them if they are
  const queryMemo: Query = useMemoState(query, queryEqual);

  const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null);

  useEffect(() => {
    if (queryMemo) {
      getDocs(queryMemo)
        .then((snapshot) => {
          setSnapshot(snapshot);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    } else {
      setSnapshot(null);
    }
  }, [queryMemo]);

  return snapshot;
}
