import { useStoreAuth } from "@/store";
import { TPrimitive, TVariableValue, IVariable } from "@/types";
import { get, find, reduce, findIndex } from "@/utils";
// @@
export const useApiVariables = () => {
  const { URL_VARIABLES, IOEVENT_VARIABLES_CHANGE } = useAppConfig();

  const auth = useStoreAuth();
  const AT = computed(() => auth.token?.accessToken || "");
  const headers = computed(() => ({
    Authorization: `Bearer ${AT.value}`,
  }));

  const { data: ls, refresh } = useFetch<IVariable[]>(URL_VARIABLES, {
    key: "variables@api",
    lazy: true,
    headers,
    default: () => [],
  });

  const lsNamed = computed(() =>
    reduce(
      ls.value,
      (res: Record<string, IVariable>, node) => {
        res[node.name] = node;
        return res;
      },
      {}
    )
  );

  const byName = (varName: string) =>
    computed(() =>
      get(
        find(ls.value, (node) => varName === node.name),
        "value"
      )
    );

  const exists = (varName: string) =>
    computed(() => -1 < findIndex(ls.value, (node) => varName === node.name));

  const reloadVariables = async () => await refresh();

  const { $socket } = useNuxtApp();
  $socket?.on(IOEVENT_VARIABLES_CHANGE, reloadVariables);
  onUnmounted(() => $socket?.off(IOEVENT_VARIABLES_CHANGE, reloadVariables));

  watchEffect(() => {
    if (AT.value) reloadVariables();
  });

  const put = async (name: string, value: TVariableValue) => {
    await $fetch(URL_VARIABLES, {
      method: "post",
      body: {
        name,
        value,
      },
      headers,
    });
  };

  const drop = async (id: TPrimitive) => {
    await $fetch(URL_VARIABLES, {
      method: "delete",
      body: { id },
      headers,
    });
  };
  //
  return {
    // @read
    ls,
    lsNamed,
    byName,
    exists,
    reload: reloadVariables,
    // @write
    put,
    drop,
  };
};
