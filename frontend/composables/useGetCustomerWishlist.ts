import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import type { Wishlist } from "~/types";

export const useGetCustomerWishlist = () => {
  const client = useMedusaClient();
  const { region } = useRegions();
  const { isAuthenticated } = useCustomer();

  const enabled = computed(() => !!region.value && !!isAuthenticated.value);

  const { data: customerWishlist, isLoading: isCustomerWishlistLoading } = useQuery({
    queryKey: [API_QUERY_KEY.CUSTOMER_WISHLIST],
    queryFn: (): Promise<Wishlist> =>
      client.client.request(
        "GET",
        `/store/customer/wishlist?region_id=${region.value?.id}&currency_code=${region.value?.currency_code}`,
      ),
    enabled: enabled,
    retry: 1,
  });

  watch(customerWishlist, (val) => {
    console.log(val);
  });

  return {
    customerWishlist,
    isCustomerWishlistLoading,
  };
};
