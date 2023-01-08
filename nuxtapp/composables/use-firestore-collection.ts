import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import firebase from "@/services/firebase";
import { TFirebaseDoc } from "@/types";
import { withoutId, withCreatedAt, withUpdatedAt } from "@/utils";

const { db } = firebase;

export const useFirestoreCollection = (collectionName: string) => {
  const { $FIRESTORE } = useAppConfig();
  const path = `${$FIRESTORE}/collections/${collectionName}`;

  const coll$ = collection(db, path);
  const error = ref<any>(null);
  const data = ref<TFirebaseDoc[]>([]);

  const unsubscribe = onSnapshot(coll$, {
    next: (snapshot) => {
      data.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    },
    error: (err) => {
      error.value = err;
    },
  });

  const exists = async (ID: string) => {
    let docExists = false;
    try {
      const path$ = doc(db, `${path}/${ID}`);
      const d$ = await getDoc(path$);
      docExists = d$.exists();
    } catch (error) {
      // ignore
    }
    return docExists;
  };

  const add = async (d: DocumentData) => {
    let res;
    try {
      res = await addDoc(coll$, withCreatedAt(withoutId(d)));
    } catch (err) {
      error.value = err;
    }
    return res;
  };

  const put = async (d: TFirebaseDoc, merge = true) => {
    let res;
    try {
      const { id: ID } = d;
      const doc$ = doc(db, `${path}/${ID}`);
      res = await setDoc(
        doc$,
        (await exists(ID))
          ? withUpdatedAt(withoutId(d))
          : withCreatedAt(withoutId(d)),
        { merge }
      );
    } catch (err) {
      error.value = err;
    }
    return res;
  };

  const rm = async (ID: string) => {
    let res;
    try {
      const doc$ = doc(db, `${path}/${ID}`);
      res = await deleteDoc(doc$);
    } catch (err) {
      error.value = err;
    }
    return res;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    error,
    data,
    add,
    rm,
    put,
    exists,
    clearError,
    unsubscribe,
    path,
  };
};
