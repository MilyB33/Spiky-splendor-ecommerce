import type { StoreGetProductsParams } from "@medusajs/medusa";
import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import type { PlantForm, PlantPlacement, WaterDemand } from "~/types";
import type { ProductFiltersSchemaValues } from "~/utils/validation/product-filters-schema";

type Filters = Pick<
  StoreGetProductsParams,
  "plant_forms" | "plant_placements" | "water_demand" | "min_price" | "max_price" | "categories_ids"
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
      expand: "categories,variants,variants.prices",
      region_id: region.value?.id,
      region: region.value?.id,
      order: order.value,
      is_search: true,
    });
  };

  const isProductsEnabled = computed(() => !!region.value?.id);

  const {
    data: products,
    isPending,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: fetchProducts,
    enabled: isProductsEnabled,
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
      filters.value.plant_forms = values.plantForms as PlantForm[];
    }

    if (values.plantPlacements) {
      filters.value.plant_placements = values.plantPlacements as PlantPlacement[];
    }

    if (values.plantWaterDemands) {
      filters.value.water_demand = values.plantWaterDemands as WaterDemand[];
    }

    if (values.minPrice >= 0) {
      filters.value.min_price = values.minPrice;
    }

    if (values.maxPrice >= 0) {
      filters.value.max_price = values.maxPrice;
    }

    refetch();
  };

  const initialFilters: ComputedRef<ProductFiltersSchemaValues> = computed(() => {
    return {
      minPrice: filters.value.min_price || 0,
      maxPrice: filters.value.max_price || 100000,
      categories: filters.value.categories_ids || [],
      plantForms: filters.value.plant_forms || [],
      plantPlacements: filters.value.plant_placements || [],
      plantWaterDemands: filters.value.water_demand || [],
    };
  });

  return { products, isLoading: isPending, initialFilters, onFiltersChange, onChangeOrder };
};
