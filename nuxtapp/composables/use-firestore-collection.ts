import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import firebase from "@/services/firebase";
import { TFirebaseDoc } from "@/types";
import { omit } from "@/utils";

const { db } = firebase;

export const useFirestoreCollection = (collectionName: string) => {
  const { $FIRESTORE } = useAppConfig();
  const path = `${$FIRESTORE}/collections/${collectionName}`;

  const coll$ = collection(db, path);
  const error = ref<any>(null);
  const data = ref<TFirebaseDoc[]>([]);

  const unsubscribe = onSnapshot(coll$, {
    next: (snapshot) => {
      data.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    error: (err) => {
      error.value = err;
    },
  });

  const add = async (d: DocumentData) => {
    let res;
    try {
      res = await addDoc(coll$, d);
    } catch (err) {
      error.value = err;
    }
    return res;
  };

  const put = async (d: TFirebaseDoc, merge = true) => {
    let res;
    try {
      const doc$ = doc(db, `${path}/${d.id}`);
      res = await setDoc(doc$, omit(d, ["id"]), { merge });
    } catch (err) {
      error.value = err;
    }
    return res;
  };

  const rm = async (docID: string) => {
    let res;
    try {
      const doc$ = doc(db, `${path}/${docID}`);
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
    clearError,
    unsubscribe,
    path,
  };
};
