import { useStoreAuth } from "@/store";
import { IData } from "@/types";

export const useApiSession = () => {
  const { URL_AUTH_SESSION } = useAppConfig();

  const auth = useStoreAuth();
  const AT = computed(() => auth.token?.accessToken);
  const ST = computed(() => auth.token?.sessionToken);
  const ID = computed(() => auth.user?.id);

  // const { data, refresh } = useLazyAsyncData<IData>("auth-session@api", () =>
  const { data, refresh } = useAsyncData<IData>(
    "auth-session@api",
    () =>
      $fetch(`${URL_AUTH_SESSION}/${ID.value}`, {
        method: "post",
        body: {
          sessionToken: ST.value,
        },
        headers: {
          Authorization: `Bearer ${AT.value}`,
        },
      }),
    {
      lazy: true,
    }
  );

  watchEffect(() => {
    if (ID.value && AT.value && ST.value) refresh();
  });

  const put = async (newSessionData: IData) => {
    await $fetch(URL_AUTH_SESSION, {
      method: "post",
      body: {
        sessionToken: ST.value,
        data: JSON.stringify(newSessionData),
      },
      headers: {
        Authorization: `Bearer ${AT.value}`,
      },
    });
    await refresh();
  };

  const clear = async () => {
    await $fetch(`${URL_AUTH_SESSION}/${ID.value}`, {
      method: "delete",
      body: {
        sessionToken: ST.value,
      },
      headers: {
        Authorization: `Bearer ${AT.value}`,
      },
    });
    await refresh();
  };

  return {
    data,
    put,
    clear,
  };
};
