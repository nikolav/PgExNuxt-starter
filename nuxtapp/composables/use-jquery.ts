export const useJQuery = (selection: any, ...params: any[]) => {
  const nodes$ = ref();
  const { $jQuery } = useNuxtApp();
  watchEffect(() => {
    if (!$jQuery?.value) return;
    const { $ } = $jQuery.value;
    nodes$.value = $(selection, ...params);
  });
  return nodes$;
};
