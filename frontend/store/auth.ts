import { defineStore } from "pinia";
import type { StorePostCustomersReq, StorePostAuthReq } from "@medusajs/medusa";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  function $reset() {
    isAuthenticated.value = false;
    isLoading.value = false;
  }

  async function registerUser(data: StorePostCustomersReq) {
    try {
      isLoading.value = true;

      const client = useMedusaClient();

      await client.customers.create(data);
      const result = await client.auth.getToken({ email: data.email, password: data.password });

      if (result.access_token) {
        isAuthenticated.value = true;
        localStorage.setItem("auth_token", result.access_token);
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function authenticate(data: StorePostAuthReq) {
    try {
      isLoading.value = true;

      const client = useMedusaClient();

      const result = await client.auth.getToken(data);

      if (result.access_token) {
        isAuthenticated.value = true;
        localStorage.setItem("auth_token", result.access_token);
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isAuthenticated,

    registerUser,
    authenticate,

    $reset,
  };
});
