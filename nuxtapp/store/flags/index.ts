import { defineStore } from "pinia";

import { IFlags } from "@/types";
import { $ISPROCESSING } from "@/config";

const initialFlags: IFlags = {
  [$ISPROCESSING]: false,
};

export const useStoreFlags = defineStore("flags", () => {
  const flag = ref(initialFlags);
  const setFlag = (name: string) => {
    flag.value[name] = true;
  };
  const unsetFlag = (name: string) => {
    flag.value[name] = false;
  };
  const isSet = (name: string) => {
    return true === flag.value[name];
  };

  return {
    flag,
    isSet,
    set: setFlag,
    unset: unsetFlag,
  };
});
