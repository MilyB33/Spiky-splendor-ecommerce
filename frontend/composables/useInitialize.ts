export const useInitialize = () => {
  const { isPendingCustomer } = useCustomer();
  const { isFetchingRegions } = useRegions();

  const isLoading = computed(() => isPendingCustomer.value || isFetchingRegions.value);

  return {
    isLoading,
  };
};
