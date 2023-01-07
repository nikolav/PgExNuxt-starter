import {
  doc,
  DocumentData,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import firebase from "@/services/firebase";
import { TFirebaseDoc, OrNoValue, IIncrementFields } from "@/types";
import { omit, transform } from "@/utils";

const { db } = firebase;

export const useFirestoreDoc = (id: string) => {
  const { $FIRESTORE } = useAppConfig();
  const path = `${$FIRESTORE}/${id}`;
  const doc$ = doc(db, path);

  const error = ref<any>(null);
  const data = ref<OrNoValue<TFirebaseDoc>>(null);

  const unsubscribe = onSnapshot(doc$, {
    async next(d) {
      data.value = !d.exists()
        ? (await setDoc(doc$, {}), { id })
        : { id: d.id, ...d.data() };
    },
    error(err) {
      error.value = err;
    },
  });

  const put = async (d: DocumentData) => {
    let res;
    try {
      res = await updateDoc(doc$, omit(d, ["id"]));
    } catch (err) {
      error.value = err;
    }
    return res;
  };

  const increment_ = async (d: IIncrementFields) => {
    let res;
    try {
      res = await updateDoc(
        doc$,
        transform(
          omit(d, ["id"]),
          (res, amount, field) => {
            res[field] = increment(amount);
          },
          <DocumentData>{}
        )
      );
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
    doc: data,
    //
    put,
    increment: increment_,
    //
    clearError,
    unsubscribe,
    //
    path,
  };
};
