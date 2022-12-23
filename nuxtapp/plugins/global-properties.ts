import { assign } from "@/utils";

// https://vuejs.org/guide/essentials/template-syntax.html#restricted-globals-access
// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
export default defineNuxtPlugin((nuxtApp) => {
  assign(nuxtApp.vueApp.config.globalProperties, {
    global_Field1: "global_Field1.value",
  });
});

// @@usage
// app.config.globalProperties.msg = 'hello'
// ...
// export default {
//   mounted() {
//     console.log(this.msg) // 'hello'
//   }
// }
