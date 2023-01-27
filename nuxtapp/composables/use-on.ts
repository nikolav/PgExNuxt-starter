import { Ref, unref } from "vue";

import { IEventsUseOn } from "@/types";
import { omit } from "@/utils";

export const useOn = (
  e: IEventsUseOn,
  isActive: boolean | Ref<boolean> = true
) => {
  const { $jQuery } = useNuxtApp();
  const { target } = e;
  const events = omit(e, ["target"]);

  watchEffect(() => {
    if (!$jQuery?.value) return;
    const { $ } = $jQuery.value;
    if (unref(isActive)) {
      $(target).on(events);
    } else {
      $(target).off(events);
    }
  });
};
