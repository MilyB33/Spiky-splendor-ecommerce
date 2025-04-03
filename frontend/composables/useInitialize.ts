export const useInitialize = () => {
  const { isCheckingSession, isLoadingCustomer } = useGetCustomer();
  const { isFetchingRegions } = useRegions();
  const { isFetchingFilters } = useFilters();
  const {isCustomerWishlistLoading} = useGetCustomerWishlist()

  const isLoading = computed(
    () =>
      isCheckingSession.value ||
      isLoadingCustomer.value ||
      isFetchingRegions.value ||
      isFetchingFilters.value ||
      isCustomerWishlistLoading.value
  );

  return {
    isLoading,
  };
};
