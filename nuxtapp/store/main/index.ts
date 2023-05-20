import { defineStore } from "pinia";
// import { ref } from "vue";
import { TPrimitive, IStoreMain, TStoreMainPutCallback } from "@/types";
import { assign, omit } from "@/utils";

const initialState: IStoreMain = {
  "app.name": "nuxtapp",
  test: "test",
};

export const useStoreMain = defineStore("main", () => {
  const state = ref(initialState);
  return {
    // access Ref<store{}>
    state,

    // set store to callback result
    set: (callback: TStoreMainPutCallback) => {
      state.value = callback(state.value);
    },

    // set store values with callback result
    put: (callback: TStoreMainPutCallback) => {
      assign(state.value, callback(state.value));
    },

    // delete provided store keys
    drop: (...paths: TPrimitive[]) => {
      state.value = omit(state.value, paths);
    },
  };
});
