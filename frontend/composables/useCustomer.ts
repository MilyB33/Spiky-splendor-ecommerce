import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useCustomer = () => {
  const client = useMedusaClient();

  // TODO: it is refetching when failed on browser focus
  const { data: customer, isPending: isFetchingCustomer } = useQuery({
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
    isAuthenticated,
    isLoading: isFetchingCustomer,
    customer: customer,
  };
};
