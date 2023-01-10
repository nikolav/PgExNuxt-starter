import { OrNoValue, IData, IDefaultUseApiDocData } from "@/types";

export const useApiDoc = (
  ID: string,
  getDefaultDoc: IDefaultUseApiDocData = () => ({})
) => {
  const error = ref<any>(null);
  const doc = ref<OrNoValue<IData>>(null);

  return {
    error,
    doc,
    put: null,
    increment: null,
    clearError: null,
  };
};
