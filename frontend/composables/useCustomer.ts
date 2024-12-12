import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";
import { useStorage } from "@vueuse/core";

export const useCustomer = () => {
  const client = useMedusaClient();
  const storageWishlist = useStorage<string | null>(
    LOCAL_STORAGE_KEY.WISHLIST_ID,
    "",
    sessionStorage,
  );

  // TODO: it is refetching when failed on browser focus
  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isPending: isPendingCustomer,
  } = useQuery({
    queryKey: [API_QUERY_KEY.CUSTOMER],
    queryFn: () =>
      client.customers.retrieve({
        expand: "billing_address,shipping_addresses",
      }),
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const isAuthenticated = computed(() => !!customer.value);

  watch(customer, () => {
    if (customer.value?.customer.wishlist_id !== storageWishlist.value) {
      storageWishlist.value = customer.value?.customer.wishlist_id;
    }
  });

  return {
    isAuthenticated,
    isLoading: isLoadingCustomer,
    isPendingCustomer,
    customer: customer,
  };
};
