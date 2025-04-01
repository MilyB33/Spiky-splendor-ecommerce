import { PLANT_FORM, PLANT_PLACEMENT, WATER_DEMAND } from "~/constant";

export const useFilters = () => {
  const { categories: mainCategory, isFetchingCategories } = useCategories();

  const plantForms = computed(() => {
    return Object.values(PLANT_FORM);
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

  const isFetchingFilters = computed(() => isFetchingCategories.value);

  return {
    plantForms,
    plantPlacements,
    plantWaterDemands,
    categories,
    isFetchingCategories,
    isFetchingFilters,
  };
};
