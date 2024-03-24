import { defineStore } from "pinia";
import type { Customer } from "@medusajs/client-types";

export const useCustomerStore = defineStore("customer", () => {
  const customer = ref<Omit<Customer, "password_hash"> | null>(null);
  const isLoading = ref<boolean>(false);

  async function retrieveCustomer() {
    try {
      isLoading.value = true;

      const client = useMedusaClient();

      const result = await client.customers.retrieve();

      customer.value = result.customer;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  function $reset() {
    customer.value = null;
    isLoading.value = false;
  }

  return {
    customer,
    isLoading,

    retrieveCustomer,

    $reset,
  };
});
