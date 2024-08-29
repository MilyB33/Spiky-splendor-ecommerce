import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useCustomer = () => {
  const client = useMedusaClient();

  const { data: customer, isPending: isFetchingCustomer } = useQuery({
    queryKey: [API_QUERY_KEY.CUSTOMER],
    queryFn: () => client.customers.retrieve(),
    retry: 0,
    retryOnMount: false,
  });

  const isAuthenticated = computed(() => !!customer.value);

  return {
    isAuthenticated,
    isLoading: isFetchingCustomer,
    customer: customer,
  };
};
