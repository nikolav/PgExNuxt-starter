import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
// import "dayjs/locale/de"; // import locale
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import objectSupport from "dayjs/plugin/objectSupport";
// import { useLocale } from "vuetify";

export default defineNuxtPlugin((_nuxtApp) => {
  // const locale$ = useLocale();
  //
  // use plugins
  dayjs.extend(isLeapYear);
  // dayjs.extend(customParseFormat);
  // dayjs.extend(objectSupport);
  // dayjs.locale("de"); // use locale
  //
  // add global $time
  return {
    provide: {
      time: {},
    },
  };
});
