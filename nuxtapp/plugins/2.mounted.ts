import { False } from "@/utils";

export default defineNuxtPlugin((nuxtApp) => {
  // https://nuxt.com/docs/api/composables/use-nuxt-app#hookname-cb
  nuxtApp.hook("app:mounted", () => {
    const { $ISMOUNTED, $ISAUTH } = useAppConfig();
    useState($ISAUTH, False);
    useState($ISMOUNTED).value = true;
  });
});
