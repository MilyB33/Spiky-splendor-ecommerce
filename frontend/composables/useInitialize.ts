export const useInitialize = () => {
  const { isLoading: isCheckingSession } = useCustomer();
  const { isFetchingCategories } = useCategories();
  const { isFetchingRegions } = useRegions();

  const isLoading = computed(
    () => isCheckingSession.value || isFetchingCategories.value || isFetchingRegions.value,
  );

  return {
    isLoading,
  };
};
