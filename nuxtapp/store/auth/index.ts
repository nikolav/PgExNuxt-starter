import { defineStore } from "pinia";
import { ref, Ref } from "vue";

import { OrNull, IUser, IToken, IAuthCredentials, IData } from "@/types";
import { get } from "@/utils";

let runInit = true;

export const useStoreAuth = defineStore("auth", () => {
  const user: Ref<OrNull<IUser>> = ref(null);
  const token: Ref<OrNull<IToken>> = ref(null);
  const session: Ref<OrNull<IData>> = ref(null);

  const error: Ref<any> = ref(null);
  const processing: Ref<boolean> = ref(false);

  const authInit = () => {
    error.value = null;
    processing.value = true;
  };

  const { URL_AUTHENTICATE, URL_REGISTER, URL_AUTH_SESSION, URL_AUTH_WHO } =
    useAppConfig();

  // fetch session data on user.id
  watch(
    () => user.value?.id,
    async () => {
      const ID = user.value?.id;
      const ST = token.value?.sessionToken;
      const AT = token.value?.accessToken;
      if (!ID || !ST || !AT) return;

      session.value = await $fetch(`${URL_AUTH_SESSION}/${ID}`, {
        method: "post",
        body: { sessionToken: ST },
        headers: { Authorization: `Bearer ${AT}` },
      });
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

  const authCached = useLocalStorage(".auth", "");
  // cache access-token in localStorage to auto-init user @mount
  watch(
    () => token.value?.accessToken,
    () => {
      const AT = token.value?.accessToken;
      if (!AT) return;
      authCached.value = AT;
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
  // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
  const { onLogin: onAuthApollo, onLogout: onAuthApolloLogout } = useApollo();
  watch(
    () => token.value?.accessToken,
    () => {
      const AT = token.value?.accessToken;
      AT && onAuthApollo(AT);
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
    user.value = null;
    token.value = null;
    session.value = null;
    authCached.value = "";
    onAuthApolloLogout();
  };

  initializeAuthFromStorage();

  return {
    error,
    processing,
    //
    user,
    token,
    session,
    //
    authenticate: $auth(URL_AUTHENTICATE),
    register: $auth(URL_REGISTER),
    logout,
  };
});
