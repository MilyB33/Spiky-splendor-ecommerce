import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, isCheckingSession, checkCustomerSession } = useAuthStore();

  if (!isAuthenticated && !isCheckingSession) {
    await checkCustomerSession();
    return;
  }
});
