export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    // @todo; global error handler
    console.log({ error, context });
    throw error;
  };
});
