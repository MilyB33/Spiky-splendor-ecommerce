import type { StoreGetProductsParams } from "@medusajs/medusa";
import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import { useCommonStore } from "~/store/common";

export const useProducts = (params?: ComputedRef<StoreGetProductsParams>) => {
  const client = useMedusaClient();
  const commonStore = useCommonStore();
  const { selectedRegion } = storeToRefs(commonStore);

  // Computed query key to ensure reactivity
  const queryKey = computed(() => [
    API_QUERY_KEY.PRODUCTS,
    API_QUERY_KEY.ALL,
    params?.value,
    selectedRegion.value?.id,
  ]);

  // Query function
  const fetchProducts = () => {
    return client.products.list({
      ...params?.value,
      expand: "categories,variants,variants.prices,plant_forms,plant_placements,plant_water_demand",
      region_id: selectedRegion.value?.id,
    });
  };

  // UseQuery hook with a dynamic query key
  const { data: products, isPending } = useQuery({
    queryKey,
    queryFn: fetchProducts,
    enabled: computed(() => !!selectedRegion.value?.id),
  });

  return { products, isLoading: isPending };
};
