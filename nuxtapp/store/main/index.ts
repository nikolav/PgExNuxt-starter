import { defineStore } from "pinia";
import { ref } from "vue";
import { TPrimitive, IStoreMain, TStoreMainPutCallback } from "@/types";
import { assign, each } from "@/utils";

const initialState: IStoreMain = {
  "app.name": "nuxtapp",
  test: "test",
};

export const useStoreMain = defineStore("main", () => {
  const store = ref(initialState);
  return {
    store,
    put: (callback: TStoreMainPutCallback) => {
      assign(store.value, callback(store.value));
    },
    drop: (...paths: TPrimitive[]) => {
      each(paths, (path) => {
        delete store.value[path];
      });
    },
  };
});
