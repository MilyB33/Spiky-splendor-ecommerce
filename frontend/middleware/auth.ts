import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated && to.path !== "/") {
    return navigateTo("/");
  }

  if (!isAuthenticated && to.path !== "/login") {
    return navigateTo("/login#login");
  }
});
