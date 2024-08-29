import { useCommonStore } from "~/store/common";

export const useInitialize = () => {
  const commonStore = useCommonStore();
  const { selectedRegion } = storeToRefs(commonStore);
  const { isLoading: isCheckingSession } = useCustomer();
  const { isFetchingCategories } = useCategories();
  const { isFetchingRegions, regions } = useRegions();

  const isLoading = computed(
    () => isCheckingSession.value || isFetchingCategories.value || isFetchingRegions.value,
  );

  watch(regions, (newRegions) => {
    const region = newRegions?.regions[0];

    if (region && !selectedRegion.value) {
      commonStore.selectRegion(region);
    }
  });

  return {
    isLoading,
  };
};
