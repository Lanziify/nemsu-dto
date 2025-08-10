"use client";

import { db } from "@/lib/firebaseClient";
import { safeCatch } from "@/lib/utils";
import {
  CollectionReference,
  doc,
  FirestoreError,
  getDoc,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React from "react";

export function useDbCollection<T>(collection: CollectionReference<T>) {
  const [data, setData] = React.useState<T[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<FirestoreError | null>(null);

  function isPath(value: unknown): boolean {
    return typeof value === "string" && /^[^/]+\/[^/]+$/.test(value);
  }

  /**
   * Resolves any top-level DocumentReference values inside a document.
   * Returns a new object with resolved data.
   */
  async function resolveRefPathValue(docData: T): Promise<T> {
    const entries = Object.entries(docData as Record<string, unknown>);

    const resolvedEntries = await Promise.all(
      entries.map(async ([key, value]) => {
        if (isPath(value)) {
          const ref = doc(db, value as string);

          const snap = await getDoc(ref);

          return [key, snap.exists() ? snap.data() : null] as const;
        }
        return [key, value] as const;
      }),
    );

    return Object.fromEntries(resolvedEntries) as T;
  }

  /**
   * Converts Firestore snapshot to fully resolved T[]
   */
  async function processSnapshot(
    docs: QueryDocumentSnapshot<T>[],
  ): Promise<T[]> {
    const results = await Promise.all(
      docs.map((doc) =>
        safeCatch<T, Error>(() => resolveRefPathValue(doc.data())),
      ),
    );

    const errors = results
      .map((r) => r.error)
      .filter((e): e is FirestoreError => e !== null);

    if (errors.length > 0) {
      setError(errors[0]);
    }

    return results.map((r) => r.data).filter((d): d is T => d !== null);
  }

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection,
      async (snapshot) => {
        try {
          const resolvedData = await processSnapshot(snapshot.docs);
          setData(resolvedData);
        } finally {
          setLoading(false);
        }
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
