export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useCustomer();

  watch(isAuthenticated, (newValue, oldValue) => {
    if (isAuthenticated.value && to.path !== "/") {
      return navigateTo("/");
    }

    if (!isAuthenticated.value && to.path !== "/login") {
      return navigateTo("/login#login");
    }
  });
});
