import { False } from "@/utils";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    const { $ISMOUNTED, $ISAUTH } = useAppConfig();
    useState($ISMOUNTED).value = true;
    useState($ISAUTH, False);
  });
});
