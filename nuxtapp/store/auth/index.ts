import { defineStore } from "pinia";
import { ref, Ref } from "vue";

import { OrNull, IUser, IToken, IAuthCredentials, IData } from "@/types";
import { get } from "@/utils";

let runInit = true;

export const useStoreAuth = defineStore("auth", () => {
  const token: Ref<OrNull<IToken>> = ref(null);
  const user: Ref<OrNull<IUser>> = ref(null);
  const session: Ref<OrNull<IData>> = ref(null);

  const error: Ref<any> = ref(null);
  const processing: Ref<boolean> = ref(false);

  const isAuth = computed(() => !!token.value?.accessToken);

  const {
    URL_AUTHENTICATE,
    URL_REGISTER,
    URL_AUTH_SESSION,
    URL_AUTH_WHO,
    APPEVENT_AUTH_TOKEN,
    AUTH_TOKEN_NAME,
  } = useAppConfig();
  const { $emitter } = useNuxtApp();

  const authInit = () => {
    error.value = null;
    processing.value = true;
  };

  // fetch session data on auth
  //  ..not synced, only fetch initial session data
  //  ..`useApiSession` to access synced session
  watch(
    [
      () => user.value?.id,
      () => token.value?.accessToken,
      () => token.value?.sessionToken,
    ],
    async ([ID, AT, ST]) => {
      if (ID && ST && AT) {
        session.value = await $fetch(`${URL_AUTH_SESSION}/${ID}`, {
          method: "post",
          body: { sessionToken: ST },
          headers: { Authorization: `Bearer ${AT}` },
        });
      }
    }
  );

  // copy auth data from response
  const authFromResponse = (res: any) => {
    const id = get(res, "user.id");
    const email = get(res, "user.email");
    const accessToken = get(res, "token.accessToken");
    const refreshToken = get(res, "token.refreshToken");
    const sessionToken = get(res, "token.sessionToken");

    if (!id || !email || !accessToken) throw `bad request`;

    user.value = { id, email };
    token.value = { accessToken, refreshToken, sessionToken };
  };

  const authCached = useLocalStorage(AUTH_TOKEN_NAME, "");
  // cache access-token in localStorage to auto-init user @mount
  watch(
    () => token.value?.accessToken,
    (AT) => {
      if (AT) authCached.value = AT;
    }
  );
  const initializeAuthFromStorage = async () => {
    if (!runInit) return;
    runInit = false;

    const AT = authCached.value;
    if (!AT) return;

    try {
      authInit();
      authFromResponse(
        await $fetch(URL_AUTH_WHO, {
          method: "post",
          headers: {
            Authorization: `Bearer ${AT}`,
          },
        })
      );
    } catch (err) {
      error.value = err;
    } finally {
      processing.value = false;
    }
  };

  // apply auth token to Apollo client
  // required if GraphQL API expects authentication to be passed via a HTTP header
  const {
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
    onLogin,
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogout-reference
    onLogout,
  } = useApollo();
  watch(
    () => token.value?.accessToken,
    async (AT) => {
      if (AT) {
        await onLogin(AT, undefined, true);
        $emitter?.emit(APPEVENT_AUTH_TOKEN, AT);
      }
    }
  );

  // auth endpoints
  const $auth = (urlAuth: string) => async (credentials: IAuthCredentials) => {
    try {
      authInit();
      authFromResponse(
        await $fetch(urlAuth, {
          method: "post",
          body: credentials,
        })
      );
    } catch (err) {
      error.value = err;
    } finally {
      processing.value = false;
    }
  };
  const logout = async () => {
    await onLogout(undefined, true);
    user.value = null;
    token.value = null;
    session.value = null;
    authCached.value = "";
  };

  initializeAuthFromStorage();

  return {
    error,
    processing,
    //
    user,
    token,
    session,
    isAuth,
    //
    authenticate: $auth(URL_AUTHENTICATE),
    register: $auth(URL_REGISTER),
    logout,
  };
});
