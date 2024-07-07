import { useAuthStore } from "~/store/auth";
import { useCustomerStore } from "~/store/customer";

export const useCustomer = () => {
  const authStore = useAuthStore();
  const customerStore = useCustomerStore();

  const isCustomerAuthenticated = computed(
    () => authStore.isAuthenticated && !!customerStore.customer,
  );

  return {
    isCustomerAuthenticated,
    customer: customerStore.customer,
  };
};
