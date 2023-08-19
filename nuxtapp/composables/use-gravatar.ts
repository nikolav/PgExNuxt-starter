// https://www.gravatar.com/avatar/6621adb9b4f1ee95b68259a2553ac3ab?d=robohash&size=92
// d=monsterid|wavatar|robohash

import md5 from "md5";
import { idGen } from "@/utils";
import { OrNull } from "@/types";

const BASE_URL = "https://www.gravatar.com/avatar";
const G_STORAGE_KEY = ".gravatar";
const DEFAULT_GRAVATAR_SIZE = 52;
// @useGravatar
export const useGravatar = (
  email: OrNull<string> = "",
  size: number = DEFAULT_GRAVATAR_SIZE
) => {
  const gravatar$ = ref("");
  const cached$ = useLocalStorage(G_STORAGE_KEY, () => "");
  const toggleGravatarLoading = useToggleFlag();

  const email_ = () => `g${idGen()}@gravatar.com`;
  const gravatarUrl_ = (email: string) =>
    `${BASE_URL}/${md5(email.toLocaleLowerCase())}?d=${
      ["monsterid", "wavatar", "robohash"][Math.floor(Math.random() * 3)]
    }&size=${size}`;

  const setGravatar_ = (email: string) => {
    const gravatarUrl = gravatarUrl_(email);
    cached$.value = gravatarUrl;
    gravatar$.value = gravatarUrl;
  };

  const reloadGravatar = async () => {
    const gravatarUrl = gravatarUrl_(email_());
    toggleGravatarLoading.on();
    try {
      await $fetch(gravatarUrl);
      cached$.value = gravatarUrl;
      gravatar$.value = gravatarUrl;
    } catch (error) {
      // ignore
    } finally {
      toggleGravatarLoading.off();
    }
  };

  onMounted(() => {
    if (cached$.value) {
      gravatar$.value = cached$.value;
    } else {
      setGravatar_(email || email_());
    }
  });

  return {
    gravatar: gravatar$,
    loading: toggleGravatarLoading.isActive,
    reload: reloadGravatar,
  };
};
