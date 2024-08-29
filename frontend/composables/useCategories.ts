import type { StoreGetProductCategoriesParams } from "@medusajs/medusa";
import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useCategories = (params?: StoreGetProductCategoriesParams) => {
  const client = useMedusaClient();

  const { data: categories, isPending: isFetchingCategories } = useQuery({
    queryKey: [API_QUERY_KEY.PRODUCT_CATEGORIES],
    queryFn: () => client.productCategories.list(params),
  });

  const filteredCategories = computed(() => {
    return categories.value?.product_categories.filter(
      (category) => category.category_children.length,
    );
  });

  return {
    categories: filteredCategories,
    isFetchingCategories,
  };
};
