// @useToggleAutoOff
export const useToggleAutoOff = (delay = 1000, initialValue = false) => {
  const toggle = useToggleFlag(initialValue);
  const ignore = watch(toggle.isActive, (isActive) => {
    if (true !== isActive) return;
    setTimeout(toggle.off, delay);
  });
  //
  return { toggle, ignore };
};
