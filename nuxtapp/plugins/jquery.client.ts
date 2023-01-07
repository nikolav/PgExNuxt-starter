import JQ from "jquery";

import { OrNull } from "@/types";
type TJQuery = typeof jQuery;

export default defineNuxtPlugin(() => {
  const { $ISMOUNTED } = useAppConfig();
  const isMounted$ = useState($ISMOUNTED);
  const jQuery = ref<OrNull<{ $: TJQuery }>>(null);

  watchEffect(() => {
    if (isMounted$.value) {
      JQ(() => {
        jQuery.value = { $: JQ };
      });
    }
  });

  return {
    provide: { jQuery },
  };
});

// 
// const { $jQuery } = useNuxtApp();
// watchEffect(() => {
//   if ($jQuery?.value) {
//     const { $ } = $jQuery.value;
//     console.log($("body button"));
//   }
// });
