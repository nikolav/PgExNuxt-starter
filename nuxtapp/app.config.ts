import {
  OVERLAYS_ID_START,
  OVERLAYS_ID_END,
  SEND_MAIL_ENDPOINT,
  PDF_RENDER_ENDPOINT,
  URL_AUTHENTICATE,
  URL_REGISTER,
  URL_AUTH_SESSION,
  URL_AUTH_WHO,
} from "@/config";

// @client, useAppConfig()
export default defineAppConfig({
  OVERLAYS_ID_START,
  OVERLAYS_ID_END,
  // @@
  SEND_MAIL_ENDPOINT,
  MAIL_CONFIG: {
    http: {
      headers: {},
    },
  },
  // @@
  PDF_RENDER_ENDPOINT,
  PDF_CONFIG: {
    defaultPdfFilename: "downloaded.pdf",
    defaultPdfTemplate: "test-doc",
    http: {
      headers: {},
    },
  },
  URL_AUTHENTICATE,
  URL_REGISTER,
  URL_AUTH_SESSION,
  URL_AUTH_WHO,
});
