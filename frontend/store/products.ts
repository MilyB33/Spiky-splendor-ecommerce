import {
  StoreGetProductCategoriesParams,
  type StoreGetProductCategoriesRes,
  type StoreGetProductsParams,
  type StoreProductsListRes,
} from "@medusajs/medusa";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const isLoading = ref<boolean>(false);
  const products = ref<StoreProductsListRes | null>(null);
  const isFetchingCategories = ref<boolean>(false);
  const categories = ref<StoreGetProductCategoriesRes | null>(null);

  async function retrieveProductList(params?: StoreGetProductsParams) {
    try {
      isLoading.value = true;

      const client = useMedusaClient();

      const result = await client.products.list(params);

      products.value = result;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function retrieveCategoriesList(params?: StoreGetProductCategoriesParams) {
    try {
      isFetchingCategories.value = true;

      const client = useMedusaClient();

      const result = await client.productCategories.list(params);

      // TODO: This should be done on backend
      // keep only parent categories
      const filteredCategories = result.product_categories.filter(
        (category) => category.category_children.length,
      );

      categories.value = { ...result, product_categories: filteredCategories };
    } catch (error) {
      console.error(error);
    } finally {
      isFetchingCategories.value = false;
    }
  }

  function $reset() {
    products.value = null;
    categories.value = null;
    isLoading.value = false;
    isFetchingCategories.value = false;
  }

  return {
    products,
    categories,

    isLoading,
    isFetchingCategories,

    retrieveProductList,
    retrieveCategoriesList,

    $reset,
  };
});
