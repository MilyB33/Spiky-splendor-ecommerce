import type { StoreGetProductsParams } from "@medusajs/medusa";
import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import { useCommonStore } from "~/store/common";

export const useProduct = (productHandle: string) => {
  const client = useMedusaClient();
  const commonStore = useCommonStore();
  const { selectedRegion } = storeToRefs(commonStore);

  const queryKey = computed(() => [
    API_QUERY_KEY.PRODUCTS,
    productHandle,
    selectedRegion.value?.id,
  ]);

  const fetchProduct = () => {
    return client.products.list({
      handle: productHandle,
      expand: "categories,variants,variants.prices,images,options,variants.options",
      region_id: selectedRegion.value?.id,
    });
  };

  const { data: products, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: fetchProduct,
    enabled: computed(() => !!selectedRegion.value?.id),
  });

  const product = computed(() => products.value?.products[0]);

  return { product, isLoading };
};
