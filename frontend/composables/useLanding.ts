import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import { ProductCollection } from "@medusajs/medusa";
import { useCommonStore } from "~/store/common";

export const useLanding = () => {
  const client = useMedusaClient();
  const { selectedRegion } = useCommonStore();

  const { data: recommendedCollectionResponse, isLoading: isLoadingRecommendedCollection } =
    useQuery({
      queryKey: [API_QUERY_KEY.COLLECTIONS],
      queryFn: () => client.collections.list({ handle: ["recommended"] }),
    });

  const recommendedCollection = computed<ProductCollection | undefined>(() => {
    return recommendedCollectionResponse?.value?.collections[0];
  });

  const keys = computed(() => [API_QUERY_KEY.PRODUCTS, recommendedCollection.value]);
  const shouldFetch = computed(() => !!recommendedCollection.value);

  const { data: recommendedProductsResponse, isLoading: isLoadingRecommendedProducts } = useQuery({
    queryKey: keys,
    queryFn: () =>
      client.products.list({
        expand:
          "categories,variants,variants.prices,plant_forms,plant_placements,plant_water_demand",
        region_id: selectedRegion?.id,
        collection_id: [recommendedCollection.value?.id || ""],
      }),
    enabled: shouldFetch,
  });

  const recommendedProducts = computed(() => recommendedProductsResponse.value?.products || []);

  return {
    recommendedProducts,
    isLoadingRecommendedProducts,
  };
};
