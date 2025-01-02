export const useInitialize = () => {
  const { isCheckingSession, isFetchingCustomer } = useGetCustomer();
  const { isFetchingRegions } = useRegions();
  const { isFetchingFilters } = useFilters();

  const isLoading = computed(
    () =>
      isCheckingSession.value ||
      isFetchingCustomer.value ||
      isFetchingRegions.value ||
      isFetchingFilters.value,
  );

  return {
    isLoading,
  };
};
