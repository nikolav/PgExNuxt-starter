// https://onycat.com/vue-easy-lightbox/
import { ILightboxImage, OrNoValue } from "@/types";
export const useLightbox = (initialImages: ILightboxImage[] = []) => {
  const images = useState("Lightbox:images", () => initialImages);
  const index = useState("Lightbox:index", () => 0);
  const isActive = useState("Lightbox:isActive", () => false);
  const setImages = (ls: ILightboxImage[]) => {
    images.value = [...ls];
  };
  const open = (ls: OrNoValue<ILightboxImage[]> = null) => {
    if (ls && 0 < ls.length) setImages(ls);
    isActive.value = true;
  };
  const close = () => {
    isActive.value = false;
  };

  return {
    images,
    index,
    isActive,
    open,
    close,
    setImages,
  };
};
