export const useInitialize = () => {
  const { isCheckingSession, isLoadingCustomer } = useGetCustomer();
  const { isFetchingRegions } = useRegions();
  const { isFetchingFilters } = useFilters();

  const isLoading = computed(
    () =>
      isCheckingSession.value ||
      isLoadingCustomer.value ||
      isFetchingRegions.value ||
      isFetchingFilters.value,
  );

  return {
    isLoading,
  };
};
