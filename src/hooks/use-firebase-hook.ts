"use client";

import {
  CollectionReference,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import React from "react";

export function useDbCollection<T>(collection: CollectionReference<T>) {
  const [data, setData] = React.useState<(T & { id: string })[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<FirestoreError | null>(null);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs as (T & { id: string })[]);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [collection]);

  return { data, loading, error };
}
