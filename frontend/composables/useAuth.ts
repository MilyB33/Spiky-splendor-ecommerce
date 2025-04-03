import type { StorePostAuthReq, StorePostCustomersReq } from "@medusajs/medusa";
import { useMutation } from "@tanstack/vue-query";

import { useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import { API_QUERY_KEY } from "~/constant";

export const useAuth = () => {
  const client = useMedusaClient();
  const queryClient = useQueryClient();
  const { synchronizeWishlist } = useWishlist();
  const { synchronizeCart } = useCart(true);
  const { snackbar } = useSnackbar();

  const { mutate: logCustomerOut, isPending: isLoggingCustomerOut } = useMutation({
    mutationFn: () => client.auth.deleteSession(),
    onError: () => {
      snackbar.error("Something went wrong.");
    },
    onSuccess: () => {
      snackbar.success("Successfully logged out.");
      navigateTo("/");

      queryClient.setQueryData([API_QUERY_KEY.SESSION], () => null);
      queryClient.setQueryData([API_QUERY_KEY.CUSTOMER], () => null);
      queryClient.setQueryData([API_QUERY_KEY.CUSTOMER_WISHLIST], () => null);
    },
  });

  const { mutateAsync: signCustomerIn, isPending: isSigningCustomerIn } = useMutation({
    mutationFn: (params: StorePostAuthReq) => client.auth.authenticate(params),
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        snackbar.error("Wrong email or password. Try Again!");
        return;
      }

      snackbar.error("Something went wrong.");
    },
    onSuccess: async (data) => {
      navigateTo("/");
      snackbar.success("Successfully logged in.");

      synchronizeWishlist(data.customer);

      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SESSION] });

      synchronizeCart(data.customer);
    },
  });

  const { mutateAsync: registerCustomer, isPending: isRegisteringCustomer } = useMutation({
    mutationFn: (params: StorePostCustomersReq) => client.customers.create(params),
    onError: (error: AxiosError) => {
      console.dir(error);

      if (error.response?.status === 422 && !!error.response?.data) {
        const data = error.response.data as { message: string };
        snackbar.error(data.message);
        return;
      }

      snackbar.error("Something went wrong.");
    },
    onSuccess: async (data) => {
      navigateTo("/");
      snackbar.success("Account created.");

      synchronizeWishlist(data.customer);

      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SESSION] });

      synchronizeCart(data.customer);
    },
  });

  return {
    isLoggingCustomerOut,
    isSigningCustomerIn,
    isRegisteringCustomer,
    logCustomerOut,
    signCustomerIn,
    registerCustomer,
  };
};
