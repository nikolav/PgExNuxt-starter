export default defineEventHandler((event) => {
  console.log(`nuxt:middleware.log`);
  // event.context.auth = { user: 123 }
});
