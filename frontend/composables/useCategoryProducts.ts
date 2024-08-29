import { StoreGetProductsParams } from "@medusajs/medusa";

export const useGetCategoryProducts = (params?: StoreGetProductsParams) => {
  const route = useRoute();

  const categoryId = useGetCategoryIdForParam({
    category: route.params.category,
    subCategory: route.params.subcategory,
  });

  const filters = computed(() => {
    return {
      ...params,
      category_id: [categoryId.value as string],
    } satisfies StoreGetProductsParams;
  });

  const result = useProducts(filters);

  return result;
};
