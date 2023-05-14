import { useStoreAuth } from "@/store";
import { TPrimitive, TVariableValue, IVariable } from "@/types";
// @@
export const useApiVariables = () => {
  const { URL_VARIABLES, IOEVENT_VARIABLES_CHANGE } = useAppConfig();

  const auth = useStoreAuth();
  const AT = computed(() => auth.token?.accessToken);

  const { data: ls, refresh } = useLazyAsyncData<IVariable[]>(
    "variables@api",
    () =>
      $fetch(URL_VARIABLES, {
        headers: {
          Authorization: `Bearer ${AT.value}`,
        },
      })
  );
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
      headers: {
        Authorization: `Bearer ${AT.value}`,
      },
    });
  };

  const drop = async (id: TPrimitive) => {
    await $fetch(URL_VARIABLES, {
      method: "delete",
      body: { id },
      headers: {
        Authorization: `Bearer ${AT.value}`,
      },
    });
  };
  //
  return {
    ls,
    put,
    drop,
  };
};
