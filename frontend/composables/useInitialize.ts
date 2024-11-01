import { useCommonStore } from "~/store/common";

export const useInitialize = () => {
  const commonStore = useCommonStore();
  const { selectedRegion, regionId } = storeToRefs(commonStore);
  const { isLoading: isCheckingSession } = useCustomer();
  const { isFetchingCategories } = useCategories();
  const { isFetchingRegions, regions } = useRegions();

  const isLoading = computed(
    () => isCheckingSession.value || isFetchingCategories.value || isFetchingRegions.value,
  );

  watch(regions, (newRegions) => {
    if (regionId && !selectedRegion.value) {
      const region = newRegions?.regions.find((region) => region.id === regionId.value);

      if (region) {
        commonStore.selectRegion(region);
      }
    }

    const region = newRegions?.regions[0];

    if (region && !selectedRegion.value) {
      commonStore.selectRegion(region);
    }
  });

  return {
    isLoading,
  };
};
