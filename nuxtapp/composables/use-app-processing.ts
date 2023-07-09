import { useStoreFlags } from "@/store";
export const useAppProcessing = () => {
  const { $ISPROCESSING } = useAppConfig();
  const { isSet, set, unset, toggle: toggleFlag } = useStoreFlags();

  const status = computed(() => isSet($ISPROCESSING));
  const on = () => set($ISPROCESSING);
  const off = () => unset($ISPROCESSING);
  const toggle = () => toggleFlag($ISPROCESSING);

  return {
    status,
    on,
    off,
    toggle,
  };
};
