import { assign } from "@/utils";
export const useToggleFlag = (initialValue = false) => {
  const isActive = ref(initialValue);
  const on = () => {
    isActive.value = true;
  };
  const off = () => {
    isActive.value = false;
  };
  const toggle = () => {
    isActive.value = !isActive.value;
  };
  return assign(toggle, { isActive, on, off });
};
