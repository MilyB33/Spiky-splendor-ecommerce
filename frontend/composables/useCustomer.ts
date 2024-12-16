import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY, COOKIES } from "~/constant";

export const useCustomer = () => {
  const client = useMedusaClient();

  const cookieWishlistId = useCookie(COOKIES.WISHLIST.KEY, { maxAge: COOKIES.WISHLIST.MAX_AGE });

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
    if (customer.value?.customer.wishlist_id !== cookieWishlistId.value) {
      cookieWishlistId.value = customer.value?.customer.wishlist_id;
    }
  });

  return {
    isAuthenticated,
    isLoading: isLoadingCustomer,
    isPendingCustomer,
    customer: customer,
  };
};
