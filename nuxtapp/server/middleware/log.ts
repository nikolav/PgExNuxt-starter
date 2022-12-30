export default defineEventHandler((event) => {
  console.log({ "nuxt:middleware.log": event.node.req.url });
  // event.context.auth = { user: 123 }
});
