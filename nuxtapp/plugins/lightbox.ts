import { Fancybox } from "@fancyapps/ui";
import { userSlideType } from "@fancyapps/ui/types/Carousel/types";
import { OptionsType } from "@fancyapps/ui/types/Fancybox/options";

export default defineNuxtPlugin((_nuxtApp) => {
  const close = (closeAll: boolean = true): void => Fancybox.close(closeAll);
  // # content [type]s: "image" | "iframe" | "video" | "inline" | "html";
  const open = (slides?: userSlideType[], options?: Partial<OptionsType>) => {
    Fancybox.destroy();
    return Fancybox.show(slides, options);
  };

  return {
    provide: {
      lightbox: {
        open,
        close,
      },
    },
  };
});
