export default defineNuxtPlugin((nuxtApp) => {
  // https://nuxt.com/docs/api/advanced/hooks
  nuxtApp.hook("app:mounted", () => {
    const { $ISMOUNTED } = useAppConfig();
    useState($ISMOUNTED).value = true;
  });
});
