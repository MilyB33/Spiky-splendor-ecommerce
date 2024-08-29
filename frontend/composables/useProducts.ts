import type { StoreGetProductsParams } from "@medusajs/medusa";
import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import { useCommonStore } from "~/store/common";

export const useProducts = (params?: ComputedRef<StoreGetProductsParams>) => {
  const client = useMedusaClient();
  const commonStore = useCommonStore();
  const { selectedRegion } = storeToRefs(commonStore);

  const { data: products, isPending } = useQuery({
    queryKey: [API_QUERY_KEY.PRODUCTS, API_QUERY_KEY.ALL, params?.value, selectedRegion.value?.id],
    queryFn: () =>
      client.products.list({
        ...params?.value,
        expand: "categories,variants,variants.prices",
        region_id: selectedRegion.value?.id,
      }),
    enabled: !!selectedRegion.value,
  });

  return { products, isLoading: isPending };
};
