import { False } from "@/utils";

// #https://nuxt.com/docs/api/advanced/hooks#lifecycle-hooks
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    const { $ISAUTH } = useAppConfig();
    useState($ISAUTH, False);
  });

  // https://nuxt.com/docs/api/composables/use-nuxt-app#hookname-cb
  nuxtApp.hook("app:mounted", () => {
    const { $ISMOUNTED } = useAppConfig();
    useState($ISMOUNTED).value = true;
  });
});
