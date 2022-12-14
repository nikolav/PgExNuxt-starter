// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("bgColor", (el, binding) => {
    // this will be called for both `mounted` and `updated`
    el.style.color = binding.value;
  });
});
