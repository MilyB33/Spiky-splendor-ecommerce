import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY, WATER_DEMAND } from "~/constant";
import type { PlantForm, PlantPlacement } from "~/types";

export const useFilters = () => {
  const client = useMedusaClient();
  const { categories: mainCategory, isFetchingCategories } = useCategories();

  const { data: plantFormsResponse, isFetching: isFetchingPlantForms } = useQuery({
    queryKey: [API_QUERY_KEY.PLANT_FORMS],
    queryFn: (): Promise<{ plant_forms: PlantForm[] }> =>
      client.client.request("GET", "/store/plant-forms/"),
  });

  const { data: plantPlacementsResponse, isFetching: isFetchingPlantPlacements } = useQuery({
    queryKey: [API_QUERY_KEY.PLANT_PLACEMENTS],
    queryFn: (): Promise<{ plant_placements: PlantPlacement[] }> =>
      client.client.request("GET", "/store/plant-placements/"),
  });

  const plantForms = computed(() => {
    return plantFormsResponse.value?.plant_forms || [];
  });

  const plantPlacements = computed(() => {
    return plantPlacementsResponse.value?.plant_placements || [];
  });

  const plantWaterDemands = computed(() => {
    return Object.values(WATER_DEMAND);
  });

  const categories = computed(() => {
    return mainCategory.value?.[0].category_children || [];
  });

  const isFetchingFilters = computed(
    () =>
      isFetchingCategories.value || isFetchingPlantForms.value || isFetchingPlantPlacements.value,
  );

  return {
    plantForms,
    plantPlacements,
    plantWaterDemands,
    categories,
    isFetchingPlantPlacements,
    isFetchingPlantForms,
    isFetchingCategories,
    isFetchingFilters,
  };
};
