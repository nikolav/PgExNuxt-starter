export default defineEventHandler((event) => {
  console.log(`nuxt-api:middleware.log`);
  // event.context.auth = { user: 123 }
});
