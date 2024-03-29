/* eslint-disable @next/next/no-img-element */
import { collection, doc, DocumentReference, query, refEqual, setDoc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useFirestore } from '../lib/Firestore';
import { useDocumentSnapshot, useDocumentsSnapshot } from '../lib';
import { cx } from '../lib';
import { useLocalState } from '../lib/Store';
import { useAuth } from '../lib/Auth';

const styles = {
  menuButton: cx(`px-2 bg-blue-500`),
  bandButton: cx(`px-2 bg-pink-500 capitalize text-white`),
};

const band = ['keith', 'liam', 'maxim', 'leeroy'];

function MemberButtons({ id }: { id: string }) {
  const firestore = useFirestore();

  const memberRef = useMemo(() => doc(firestore, 'members', id), [firestore, id]);
  const memberSnapshot = useDocumentSnapshot(memberRef);

  return (
    <>
      {memberSnapshot &&
        (memberSnapshot.exists() ? (
          <button className={styles.bandButton} type="button" onClick={() => deleteDoc(memberRef)}>
            - {id}
          </button>
        ) : (
          <button className={styles.bandButton} type="button" onClick={() => setDoc(memberRef, { name: id })}>
            + {id}
          </button>
        ))}
    </>
  );
}

function HomePage() {
  const [fire, setFire] = useLocalState('fire');
  const [animate, setAnimate] = useLocalState('animate');

  const firestore = useFirestore();
  const { currentUser, claims } = useAuth();
  // Don't mutate the query every render
  const membersQuery = useMemo(() => query(collection(firestore, 'members')), [firestore]);
  const membersSnapshot = useDocumentsSnapshot(membersQuery);

  const [selectedMemberRef, setSelectedMemberRef] = useState<DocumentReference | null>(null);
  const selectedMemberSnapshot = useDocumentSnapshot(selectedMemberRef);

  return (
    <>
      <header className="flex bg-black text-white p-2 gap-2">
        <button className={styles.menuButton} onClick={() => setAnimate(!animate)}>
          {animate ? 'Stop' : 'Play'}
        </button>
        <button className={styles.menuButton} onClick={() => setFire(!fire)}>
          {fire ? 'Extinguish' : 'Light'}
        </button>
        {currentUser ? (
          <Link href="/logout">
            <a className={styles.menuButton}>Logout</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className={styles.menuButton}>Login</a>
          </Link>
        )}
      </header>
      <main className="px-4">
        <h1 className="text-3xl font-extrabold my-3">
          {fire ? '🔥🔥🔥🔥' : '🪵🪵🪵🪵'} Firestarter {fire ? '🔥🔥🔥🔥' : '🪵🪵🪵🪵'}
        </h1>
        <img src={animate ? '/firestarter.gif' : '/firestarter.jpg'} alt="firestarter" />

        {currentUser && (
          <div className="gap-2">
            {band.map((id) => (
              <MemberButtons key={id} id={id} />
            ))}
          </div>
        )}

        <h2 className="text-lg font-bold">Band</h2>
        {membersSnapshot && (
          <ul>
            {membersSnapshot.docs.map((doc) => (
              <li
                key={doc.id}
                onClick={() => {
                  if (!selectedMemberRef || !refEqual(selectedMemberRef, doc.ref)) {
                    setSelectedMemberRef(doc.ref);
                  }
                }}
              >
                {doc.get('name')}
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-lg font-bold" onClick={() => setSelectedMemberRef(null)}>
          Selected
        </h2>
        {selectedMemberSnapshot ? <div>{selectedMemberSnapshot.get('name')}</div> : <div>None</div>}

        <h2 className="text-lg font-bold">Authentication</h2>
        <p className="font-bold">{currentUser ? currentUser.email : 'Unauthenticated'}</p>
        <textarea className="block w-1/2 h-20 border font-mono text-sm p-1" readOnly value={JSON.stringify(claims)} />
      </main>
    </>
  );
}

export default HomePage;
