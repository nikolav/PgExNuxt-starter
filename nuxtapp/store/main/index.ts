import { defineStore } from "pinia";
// import { ref } from "vue";
import { TPrimitive, IStoreMain, TStoreMainPutCallback } from "@/types";
import { assign, omit } from "@/utils";

const initialState: IStoreMain = {
  "app.name": "nuxtapp",
  "test.0": "test",
};

export const useStoreMain = defineStore("main", () => {
  const store = ref(initialState);
  return {
    // access Ref<store{}>
    store,

    // set store to callback result
    set: (callback: TStoreMainPutCallback) => {
      store.value = callback(store.value);
    },

    // set store values with callback result
    put: (callback: TStoreMainPutCallback) => {
      assign(store.value, callback(store.value));
    },

    // delete provided store keys
    drop: (...paths: TPrimitive[]) => {
      store.value = omit(store.value, paths);
    },
  };
});
