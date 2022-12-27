import {
  IOEVENT_LIKES_CHANGE,
  IOEVENT_MESSAGES_CHANGE,
  IOEVENT_STORAGE_CHANGE,
  IOEVENT_VARIABLES_CHANGE,
  IOEVENT_COMMENTS_CHANGE,
  OVERLAYS_ID_END,
  OVERLAYS_ID_START,
  PDF_RENDER_ENDPOINT,
  SEND_MAIL_ENDPOINT,
  STORAGE_POLLINTERVAL,
  URL_AUTH_SESSION,
  URL_AUTH_WHO,
  URL_AUTHENTICATE,
  URL_REGISTER,
  URL_STORAGE_DOWNLOAD,
  URL_STORAGE_PUBLIC_URL,
  URL_UPLOAD,
  URL_VARIABLES,
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
  URL_AUTH_SESSION,
  URL_AUTH_WHO,
  URL_AUTHENTICATE,
  URL_REGISTER,
  URL_STORAGE_DOWNLOAD,
  URL_STORAGE_PUBLIC_URL,
  URL_UPLOAD,
  URL_VARIABLES,
  //
  IOEVENT_LIKES_CHANGE,
  IOEVENT_MESSAGES_CHANGE,
  IOEVENT_STORAGE_CHANGE,
  IOEVENT_VARIABLES_CHANGE,
  IOEVENT_COMMENTS_CHANGE,
  // 
  LIKES_PREFIX: "like::",
  STORAGE_POLLINTERVAL,
});
