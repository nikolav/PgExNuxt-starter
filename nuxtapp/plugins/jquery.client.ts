import JQ from "jquery";

import { OrNull } from "@/types";
type TJQuery = typeof jQuery;

// https://api.jquery.com/
export default defineNuxtPlugin(() => {
  const { $ISMOUNTED } = useAppConfig();
  const mounted$ = useState($ISMOUNTED);
  const jQuery = ref<OrNull<{ $: TJQuery }>>(null);

  watchEffect(() => {
    if (!mounted$.value) return;
    JQ(() => {
      jQuery.value = { $: JQ };
    });
  });

  return {
    provide: { jQuery },
  };
});

//
// const { $jQuery } = useNuxtApp();
// watchEffect(() => {
//   if (!$jQuery?.value) return;
//   const { $ } = $jQuery.value;
//   console.log($("body button"));
// });
