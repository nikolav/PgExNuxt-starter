import { useStoreAuth } from "@/store";
export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  const auth = useStoreAuth();
  const { AUTH_TOKEN_NAME } = useAppConfig();
  const AT = computed(() => auth.token?.accessToken || "");
  nuxtApp.hook("apollo:auth", ({ client, token }) => {
    // apply apollo client token
    token.value = AT.value;
    console.log({ client, [AUTH_TOKEN_NAME]: AT.value });
  });
});
