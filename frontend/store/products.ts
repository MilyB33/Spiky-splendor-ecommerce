import type { StoreGetProductsParams, StoreProductsListRes } from "@medusajs/medusa";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const isLoading = ref<boolean>(false);
  const products = ref<StoreProductsListRes | null>(null);

  async function retrieveProductList(params: StoreGetProductsParams) {
    try {
      isLoading.value = true;

      const client = useMedusaClient();

      const result = await client.products.list(params);
      console.log(result);
      products.value = result;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  function $reset() {
    products.value = null;
    isLoading.value = false;
  }

  return {
    products,
    isLoading,

    retrieveProductList,

    $reset,
  };
});
