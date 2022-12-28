import { useStoreAuth } from "@/store";
export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  const auth = useStoreAuth();
  const { AUTH_TOKEN_NAME } = useAppConfig();
  const AT = computed(() => auth.token?.accessToken || "");
  nuxtApp.hook("apollo:auth", ({ token }) => {
    // apply apollo client token
    token.value = AT.value;
    console.log({ [AUTH_TOKEN_NAME]: AT.value });
  });
});
