import { DocumentReference, DocumentSnapshot, onSnapshot, refEqual, SnapshotListenOptions } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useMemoState from './useMemoState';

export default function useDocumentSnapshot(docRef: DocumentReference | null, options?: SnapshotListenOptions): DocumentSnapshot<unknown> | null {
  // You really should not be sending in mutating objects but handle them if they are
  const docMemo = useMemoState(docRef, refEqual);
  const optionsMemo: SnapshotListenOptions = useMemoState(options);

  const [snapshot, setSnapshot] = useState<DocumentSnapshot<unknown> | null>(null);

  useEffect(() => {
    if (docMemo) {
      const unsubscribe = onSnapshot(
        docMemo,
        optionsMemo || {},
        (snapshot) => {
          setSnapshot(snapshot);
        },
        (error) => {
          console.error(error);
          throw error;
        }
      );
      return () => {
        unsubscribe();
      };
    } else {
      setSnapshot(null);
    }
  }, [docMemo, optionsMemo]);

  return snapshot;
}
