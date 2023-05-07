import { defineStore } from "pinia";
import {
  // ref,
  Ref,
} from "vue";

import { OrNull, IUser, IToken, IAuthCredentials, IData } from "@/types";
import { pickValues } from "@/utils";

let runInit = true;

export const useStoreAuth = defineStore("auth", () => {
  const {
    $ISAUTH,
    $ISMOUNTED,
    $TOKEN,
    URL_AUTH_SESSION,
    URL_AUTH_WHO,
    URL_AUTHENTICATE,
    URL_REGISTER,
  } = useAppConfig();

  const token: Ref<OrNull<IToken>> = ref(null);
  const user: Ref<OrNull<IUser>> = ref(null);
  const session: Ref<OrNull<IData>> = ref(null);
  const error: Ref<any> = ref(null);
  const processing: Ref<boolean> = ref(false);

  const isAuth = useState($ISAUTH);
  const authCached = useLocalStorage($TOKEN, "");

  const authInit = () => {
    error.value = null;
    processing.value = true;
  };

  // copy auth data from response
  const authFromResponse = (res: any) => {
    const [id, email, accessToken, refreshToken, sessionToken] = pickValues(
      res,
      "user.id",
      "user.email",
      "token.accessToken",
      "token.refreshToken",
      "token.sessionToken"
    );

    if (!id || !email || !accessToken) throw `bad request`;

    user.value = { id, email };
    token.value = { accessToken, refreshToken, sessionToken };
  };

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

  // apply auth token to Apollo client
  // required if GraphQL API expects authentication to be passed via a HTTP header
  const {
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
    onLogin,
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogout-reference
    onLogout,
  } = useApollo();

  const logout = async () => {
    await onLogout(undefined, true);
    user.value = null;
    token.value = null;
    session.value = null;
    authCached.value = "";
  };

  const initializeAuthFromStorage = async () => {
    if (!runInit) return;

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
      runInit = false;
      processing.value = false;
    }
  };

  const isMounted = useState($ISMOUNTED);
  watchEffect(() => {
    if (isMounted.value) initializeAuthFromStorage();
  });

  // @auth
  watch(
    () => token.value?.accessToken,
    async (AT) => {
      if (AT) {
        // set apollo auth
        await onLogin(AT, undefined, true);
        // cache access-token in localStorage to auto-init user @mount
        authCached.value = AT;
      }
      isAuth.value = !!AT;
    }
  );

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

  return {
    error,
    processing,

    user,
    token,
    session,

    authenticate: $auth(URL_AUTHENTICATE),
    register: $auth(URL_REGISTER),
    logout,
  };
});
