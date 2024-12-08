export const useInitialize = () => {
  const { isLoading: isCheckingSession } = useCustomer();
  const { isFetchingRegions } = useRegions();

  const isLoading = computed(() => isCheckingSession.value || isFetchingRegions.value);

  return {
    isLoading,
  };
};
