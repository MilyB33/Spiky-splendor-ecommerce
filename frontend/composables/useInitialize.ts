export const useInitialize = () => {
  const { isCheckingSession, isFetchingCustomer } = useGetCustomer();
  const { isFetchingRegions } = useRegions();

  const isLoading = computed(
    () => isCheckingSession.value || isFetchingCustomer.value || isFetchingRegions.value,
  );

  return {
    isLoading,
  };
};
