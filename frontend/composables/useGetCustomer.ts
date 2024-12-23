import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY, COOKIES } from "~/constant";

export const useGetCustomer = () => {
  const client = useMedusaClient();
  const authenticatedCookie = useCookie(COOKIES.AUTHENTICATED.KEY, {
    maxAge: COOKIES.AUTHENTICATED.MAX_AGE,
  });

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

  const { data: session } = useQuery({
    queryKey: [API_QUERY_KEY.SESSION],
    queryFn: () => client.auth.getSession(),
    enabled: !!customer.value?.customer,
  });

  watch(session, (newValue) => {
    if (newValue) {
      authenticatedCookie.value = "true";
    } else {
      authenticatedCookie.value = "false";
    }
  });

  const isAuthenticated = computed(() => authenticatedCookie.value);

  return {
    customer,
    isLoadingCustomer,
    isPendingCustomer,
    isAuthenticated,
  };
};
