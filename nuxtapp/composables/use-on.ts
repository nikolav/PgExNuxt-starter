import { Ref, unref } from "vue";
import { omit } from "@/utils";

interface IEventsUseOn<TEvent = any> {
  target: any;
  [type: string]: (...e: TEvent[]) => void;
}
export const useOn = (
  e: IEventsUseOn,
  isActive: boolean | Ref<boolean> = true
) => {
  const { $jQuery } = useNuxtApp();
  const { target } = e;
  const events = omit(e, ["target"]);

  watchEffect(() => {
    if ($jQuery?.value) {
      const { $ } = $jQuery.value;
      const on$ = unref(isActive);
      if (on$) {
        $(target).on(events);
      } else {
        $(target).off(events);
      }
    }
  });
};
