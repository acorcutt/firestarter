import { collection, query } from 'firebase/firestore';
import { useMemo } from 'react';
import { useFirestore } from '../lib/Firestore';
import useSuspendedQuery from '../lib/firestore/useSuspendedSnapshotQuery';

export default function Posts() {
  const firestore = useFirestore();

  // Don't mutate the query every render
  const postsQuery = useMemo(() => query(collection(firestore, 'posts')), [firestore]);
  //const [postsSnapshot] = useQuerySnapshot(postsQuery);
  const postsSnapshot = useSuspendedQuery(postsQuery);

  return (
    postsSnapshot && (
      <ul>
        {postsSnapshot.docs.map((doc) => (
          <li key={doc.id}>{doc.get('name')}</li>
        ))}
      </ul>
    )
  );
}
