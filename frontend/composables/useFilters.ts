import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY, PLANT_PLACEMENT, WATER_DEMAND } from "~/constant";
import type { PlantForm } from "~/types";

export const useFilters = () => {
  const client = useMedusaClient();
  const { categories: mainCategory, isFetchingCategories } = useCategories();

  const { data: plantFormsResponse, isFetching: isFetchingPlantForms } = useQuery({
    queryKey: [API_QUERY_KEY.PLANT_FORMS],
    queryFn: (): Promise<{ plant_forms: PlantForm[] }> =>
      client.client.request("GET", "/store/plant-forms/"),
  });

  const plantForms = computed(() => {
    return plantFormsResponse.value?.plant_forms || [];
  });

  const plantPlacements = computed(() => {
    return Object.values(PLANT_PLACEMENT);
  });

  const plantWaterDemands = computed(() => {
    return Object.values(WATER_DEMAND);
  });

  const categories = computed(() => {
    return mainCategory.value?.[0].category_children || [];
  });

  const isFetchingFilters = computed(
    () => isFetchingCategories.value || isFetchingPlantForms.value,
  );

  return {
    plantForms,
    plantPlacements,
    plantWaterDemands,
    categories,
    isFetchingPlantForms,
    isFetchingCategories,
    isFetchingFilters,
  };
};
