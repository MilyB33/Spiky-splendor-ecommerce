import type { StoreGetProductsParams } from "@medusajs/medusa";
import { useProductStore } from "~/store/products";

export const useProducts = (params?: ComputedRef<StoreGetProductsParams>) => {
  const productStore = useProductStore();
  const { products, isFetchingCategories: isLoading } = storeToRefs(productStore);

  onBeforeMount(() => {
    if (!isLoading.value) {
      productStore.retrieveProductList(params?.value);
    }
  });

  return { products, isLoading: isLoading };
};
