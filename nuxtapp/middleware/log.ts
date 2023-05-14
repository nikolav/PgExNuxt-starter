export default defineNuxtRouteMiddleware((to, from) => {
  // const user = useState('user')
  // if (!user.value.isAuthorized) {
  //   return abortNavigation()
  // }
  // return navigateTo('/edit-post')
  console.log({ "@nuxt:route-middleware.log": Date.now() });
});
