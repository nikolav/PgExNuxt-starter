import { useStoreAuth } from "@/store";
export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  const auth = useStoreAuth();
  const AT = computed(() => auth.token?.accessToken || "");
  nuxtApp.hook("apollo:auth", ({ token }) => {
    // apply apollo client token
    console.log({ "AT.apollo": AT.value });
    token.value = AT.value;
  });
});
