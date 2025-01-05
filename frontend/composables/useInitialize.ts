export const useInitialize = () => {
  const { isCheckingSession, isLoadingCustomer, customer } = useGetCustomer();
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
