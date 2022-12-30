export default defineEventHandler((event) => {
  console.log(`nuxt:middleware.log`);
  console.log({ event });
  // event.context.auth = { user: 123 }
});
