import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useGetCustomer = () => {
  const client = useMedusaClient();

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

  return {
    customer,
    isLoadingCustomer,
    isPendingCustomer,
    isAuthenticated,
  };
};
