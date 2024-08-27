import type { StoreGetProductsParams } from "@medusajs/medusa";
import { useProductStore } from "~/store/products";

export const useProducts = (params?: ComputedRef<StoreGetProductsParams>) => {
  const productStore = useProductStore();
  const { products, isFetchingProducts: isLoading } = storeToRefs(productStore);

  onBeforeMount(() => {
    if (!isLoading.value) {
      productStore.retrieveProductList({
        ...params?.value,
        expand: "categories,variants,variants.prices",
        region_id: "reg_01J680WVRHRBJT12483PVMWCN8",
      });
    }
  });

  return { products, isLoading: isLoading };
};
