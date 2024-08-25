import {
  StoreGetProductCategoriesParams,
  type StoreGetProductCategoriesRes,
  type StoreGetProductsParams,
} from "@medusajs/medusa";
import { defineStore } from "pinia";
import type { ProductsListResponse } from "~/types";

export const useProductStore = defineStore("product", () => {
  const iseFetchingProducts = ref<boolean>(false);
  const products = ref<ProductsListResponse | null>(null);
  const isFetchingCategories = ref<boolean>(false);
  const categories = ref<StoreGetProductCategoriesRes | null>(null);

  async function retrieveProductList(params?: StoreGetProductsParams) {
    try {
      iseFetchingProducts.value = true;

      const client = useMedusaClient();

      const result = await client.products.list(params);

      products.value = result;
    } catch (error) {
      console.error(error);
    } finally {
      iseFetchingProducts.value = false;
    }
  }

  async function retrieveCategoriesList(params?: StoreGetProductCategoriesParams) {
    try {
      isFetchingCategories.value = true;

      const client = useMedusaClient();

      const result = await client.productCategories.list(params);

      // TODO: This should be done on backend
      // keep only parent categories

      const filteredCategories = computed(() =>
        result.product_categories.filter((category) => category.category_children.length),
      );

      categories.value = { ...result, product_categories: filteredCategories.value };
    } catch (error) {
      console.error(error);
    } finally {
      isFetchingCategories.value = false;
    }
  }

  function $reset() {
    products.value = null;
    categories.value = null;
    iseFetchingProducts.value = false;
    isFetchingCategories.value = false;
  }

  return {
    products,
    categories,

    iseFetchingProducts,
    isFetchingCategories,

    retrieveProductList,
    retrieveCategoriesList,

    $reset,
  };
});
