import { has } from "nikolav-utils";

export const useThemeIsDark = () => {
  const { DARK_THEMES } = useAppConfig();
  return computed(() => has(DARK_THEMES, String(useState("theme").value)));
};
