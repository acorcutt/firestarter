import { DocumentReference, DocumentSnapshot, getDoc, refEqual } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useMemoState from './useMemoState';

export default function useDocument(docRef: DocumentReference | null): DocumentSnapshot<unknown> | null {
  // You really should not be sending in mutating objects but handle them if they are
  const docMemo = useMemoState(docRef, refEqual);

  const [snapshot, setSnapshot] = useState<DocumentSnapshot<unknown> | null>(null);

  useEffect(() => {
    if (docMemo) {
      getDoc(docMemo)
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
  }, [docMemo]);

  return snapshot;
}
