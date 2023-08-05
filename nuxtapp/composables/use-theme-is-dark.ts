import { has } from "nikolav-utils";

export const useThemeIsDark = () => {
  const { DARK_THEMES } = useAppConfig();
  const theme$ = useState("theme");

  const isDark$ = computed(() => has(DARK_THEMES, String(theme$.value)));

  // #
  return isDark$;
};
