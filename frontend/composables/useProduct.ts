import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useProduct = (productHandle: string) => {
  const client = useMedusaClient();
  const { region } = useRegions();

  const queryKey = computed(() => [API_QUERY_KEY.PRODUCTS, productHandle, region.value?.id]);

  const fetchProduct = () => {
    return client.products.list({
      handle: productHandle,
      expand:
        "categories,variants,variants.prices,images,options,variants.options,plant_forms,plant_placements,plant_water_demand",
      region_id: region.value?.id,
      region: region.value?.id,
    });
  };

  const isProductEnabled = computed(() => !!region.value?.id);

  const { data: products, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: fetchProduct,
    enabled: isProductEnabled,
  });

  const product = computed(() => products.value?.products[0]);

  return { product, isLoading };
};
