import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { TPrimitive } from "@/types";
import { assign, each } from "@/utils";

interface IStoreMain {
  [key: TPrimitive]: any;
}
const initialState: IStoreMain = {
  "app.name": "nuxtapp",
  test: "test",
};

export const useStoreMain = defineStore("main", () => {
  const store: Ref<IStoreMain> = ref(initialState);
  return {
    store,
    put: (callback: (currentStore: IStoreMain) => IStoreMain) => {
      assign(store.value, callback(store.value));
    },
    drop: (...paths: TPrimitive[]) => {
      each(paths, (path) => {
        delete store.value[path];
      });
    },
  };
});
