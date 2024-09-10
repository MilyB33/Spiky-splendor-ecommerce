export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useCustomer();

  watch(isAuthenticated, (newValue) => {
    if (newValue && to.path !== "/") {
      return navigateTo("/");
    }

    if (!newValue && to.path !== "/login") {
      return navigateTo("/login#login");
    }
  });
});
