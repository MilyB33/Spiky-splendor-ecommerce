export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useGetCustomer();

  const allowedRoutes = ["login"];

  if (!isAuthenticated.value && !allowedRoutes.some((route) => to.path.includes(route))) {
    return abortNavigation("Insufficient permissions.");
  }
});
