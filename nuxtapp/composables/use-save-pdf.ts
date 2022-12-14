import fileSaver from "file-saver";
import { merge } from "@/utils";

const { saveAs } = fileSaver;

export const useSavePdf = () => {
  const { PDF_RENDER_ENDPOINT, PDF_CONFIG: CONFIG } = useAppConfig();
  const savePdf = async ({
    filename = CONFIG.defaultPdfFilename,
    template = CONFIG.defaultPdfTemplate,
    locals = {},
    config = {},
  }) => {
    let file;

    try {
      const options = merge({}, CONFIG, config);
      const bufferPdf: Blob = await $fetch(
        `${PDF_RENDER_ENDPOINT}/${template}`,
        {
          method: "post",
          body: locals,
          headers: options.http.headers,
          responseType: "arrayBuffer",
        }
      );

      file = saveAs(new Blob([bufferPdf]), filename);
    } catch (error) {
      console.error(error)
    }

    return file;
  };

  return { savePdf };
};
