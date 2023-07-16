import { has } from "nikolav-utils";

export default defineNuxtPlugin((_nuxtApp) => {
  const { DARK_THEMES, CLASSNAME_DARK } = useAppConfig();
  const currentThemeName$ = useState("theme");
  const html$ = useJQuery("html");
  watchEffect(() => {
    html$.value?.toggleClass(
      CLASSNAME_DARK,
      currentThemeName$.value
        ? has(DARK_THEMES, String(currentThemeName$.value))
        : false
    );
  });
});
