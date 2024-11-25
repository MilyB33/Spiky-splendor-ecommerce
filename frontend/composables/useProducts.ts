import type { StoreGetProductsParams } from "@medusajs/medusa";
import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import type { ProductFiltersSchemaValues } from "~/utils/validation/product-filters-schema";

type Filters = Pick<
  StoreGetProductsParams,
  | "plant_forms_ids"
  | "plant_placements_ids"
  | "plant_water_demand_ids"
  | "min_price"
  | "max_price"
  | "categories_ids"
>;

type OrderValues = "price" | "-price" | "title" | "-title";
type OrderParam = "title" | "-title" | "-variants.prices.amount" | "variants.prices.amount" | "";

export const useProducts = (params?: ComputedRef<StoreGetProductsParams>) => {
  const client = useMedusaClient();
  const { region } = useRegions();
  const filters = ref<Filters>({});
  const order = ref<OrderParam>("title");

  // Computed query key to ensure reactivity
  const queryKey = computed(() => [
    API_QUERY_KEY.PRODUCTS,
    API_QUERY_KEY.ALL,
    params?.value,
    filters.value,
    order.value,
    region.value?.id,
  ]);

  // Query function
  const fetchProducts = () => {
    return client.products.list({
      ...params?.value,
      ...filters.value,
      expand: "categories,variants,variants.prices,plant_forms,plant_placements,plant_water_demand",
      region_id: region.value?.id,
      order: order.value,
      is_search: true,
    });
  };

  // UseQuery hook with a dynamic query key
  const {
    data: products,
    isPending,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: fetchProducts,
    enabled: computed(() => !!region.value?.id),
  });

  const onChangeOrder = (order_: OrderValues) => {
    switch (order_) {
      case "-price":
        order.value = "-variants.prices.amount";
        break;
      case "price":
        order.value = "variants.prices.amount";
        break;
      case "title":
        order.value = "title";
        break;
      case "-title":
        order.value = "-title";
        break;
      default:
        order.value = "";
    }
  };

  const onFiltersChange = (values: ProductFiltersSchemaValues) => {
    if (values.categories) {
      filters.value.categories_ids = values.categories;
    }

    if (values.plantForms) {
      filters.value.plant_forms_ids = values.plantForms;
    }

    if (values.plantPlacements) {
      filters.value.plant_placements_ids = values.plantPlacements;
    }

    if (values.plantWaterDemands) {
      filters.value.plant_water_demand_ids = values.plantWaterDemands;
    }

    if (values.minPrice >= 0) {
      filters.value.min_price = values.minPrice;
    }

    if (values.maxPrice >= 0) {
      filters.value.max_price = values.maxPrice;
    }

    refetch();
  };

  return { products, isLoading: isPending, onFiltersChange, onChangeOrder };
};
