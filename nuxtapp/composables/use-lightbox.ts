import { ILightboxImage, OrNoValue } from "@/types";

export const useLightbox = (initialImages: ILightboxImage[] = []) => {
  const images = useState("Lightbox.images", () => initialImages);
  const index = useState("Lightbox.index", () => 0);
  const isActive = useState("Lightbox.isActive", () => false);
  const setImages = (ls: ILightboxImage[]) => {
    images.value = [...ls];
  };
  const open = (ls: OrNoValue<ILightboxImage[]>, i: number = 0) => {
    if (ls) setImages(ls);
    index.value = i;
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
