import jQuery from "jquery";

export default defineNuxtPlugin(() => {
  const { $ISMOUNTED } = useAppConfig();
  const isMounted = useState($ISMOUNTED);
  const jquery = ref();

  watchEffect(() => {
    if (isMounted.value) {
      jQuery(() => {
        jquery.value = { jQuery };
      });
    }
  });

  return {
    provide: { jquery },
  };
});
