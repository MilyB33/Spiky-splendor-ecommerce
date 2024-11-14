import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import type { PlantForm, PlantPlacement, PlantWaterDemand } from "~/types";

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

  const { data: plantWaterDemandsResponse, isFetching: isFetchingPlantWaterDemands } = useQuery({
    queryKey: [API_QUERY_KEY.PLANT_WATER_DEMANDS],
    queryFn: (): Promise<{ plant_water_demands: PlantWaterDemand[] }> =>
      client.client.request("GET", "/store/plant-water-demands/"),
  });

  const plantForms = computed(() => {
    return plantFormsResponse.value?.plant_forms || [];
  });

  const plantPlacements = computed(() => {
    return plantPlacementsResponse.value?.plant_placements || [];
  });

  const plantWaterDemands = computed(() => {
    return plantWaterDemandsResponse.value?.plant_water_demands || [];
  });

  const categories = computed(() => {
    return mainCategory.value?.[0].category_children || [];
  });

  return {
    plantForms,
    plantPlacements,
    plantWaterDemands,
    categories,
    isFetchingPlantWaterDemands,
    isFetchingPlantPlacements,
    isFetchingPlantForms,
    isFetchingCategories,
  };
};
