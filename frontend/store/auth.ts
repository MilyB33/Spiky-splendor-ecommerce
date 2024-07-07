import { defineStore } from "pinia";
import type { StorePostCustomersReq, StorePostAuthReq } from "@medusajs/medusa";
import { useCustomerStore } from "./customer";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isCheckingSession = ref<boolean>(false);

  function $reset() {
    isAuthenticated.value = false;
    isLoading.value = false;
  }

  async function registerCustomer(data: StorePostCustomersReq) {
    const customerStore = useCustomerStore();

    isLoading.value = true;

    const client = useMedusaClient();

    const result = await client.customers.create(data);

    if (result.customer) {
      isAuthenticated.value = true;
      customerStore.customer = result.customer;
    }

    isLoading.value = false;
  }

  async function authenticateCustomer(data: StorePostAuthReq) {
    const customerStore = useCustomerStore();

    isLoading.value = true;

    const client = useMedusaClient();

    const result = await client.auth.authenticate(data);

    if (result.customer) {
      isAuthenticated.value = true;
      customerStore.customer = result.customer;
    }

    isLoading.value = false;
  }

  async function checkCustomerSession() {
    const customerStore = useCustomerStore();
    const client = useMedusaClient();

    try {
      isLoading.value = true;
      isCheckingSession.value = true;

      const result = await client.auth.getSession();

      if (result.customer) {
        isAuthenticated.value = true;
        customerStore.customer = result.customer;
      }

      return result.customer;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
      isCheckingSession.value = false;
    }
  }

  async function logoutCustomer() {
    const customerStore = useCustomerStore();

    isLoading.value = true;

    const client = useMedusaClient();

    const result = await client.auth.deleteSession();

    if (result.response.status === 200) {
      isAuthenticated.value = false;
      customerStore.$reset();
      $reset();
    }

    isLoading.value = false;
  }

  return {
    isAuthenticated,
    isCheckingSession,
    isLoading,

    registerCustomer,
    authenticateCustomer,
    checkCustomerSession,
    logoutCustomer,

    $reset,
  };
});
