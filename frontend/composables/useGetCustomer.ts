import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY, COOKIES } from "~/constant";

export const useGetCustomer = () => {
  const client = useMedusaClient();
  const authenticatedCookie = useCookie(COOKIES.AUTHENTICATED.KEY, {
    maxAge: COOKIES.AUTHENTICATED.MAX_AGE,
  });

  const {
    data: session,
    isPending: isCheckingSession,
    isError: isSessionError,
  } = useQuery({
    queryKey: [API_QUERY_KEY.SESSION],
    queryFn: () => client.auth.getSession(),
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isFetching: isFetchingCustomer,
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
    enabled: !!session.value?.customer,
  });

  watch(session, (newValue) => {
    if (newValue) {
      authenticatedCookie.value = "true";
    } else {
      authenticatedCookie.value = "false";
    }
  });

  watch(isSessionError, (newValue) => {
    if (newValue) {
      authenticatedCookie.value = "false";
    }
  });

  const isAuthenticated = computed(() => authenticatedCookie.value);

  return {
    customer,
    isLoadingCustomer,
    isPendingCustomer,
    isFetchingCustomer,
    isCheckingSession,
    isAuthenticated,
  };
};
