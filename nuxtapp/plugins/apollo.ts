import { useStoreAuth } from "@/store";
export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  const auth = useStoreAuth();
  const AT = computed(() => auth.token?.accessToken || "");
  nuxtApp.hook("apollo:auth", ({ client, token }) => {
    // apply apollo client token
    token.value = AT.value;
  });
});
