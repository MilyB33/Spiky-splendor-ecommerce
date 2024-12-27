import type { StorePostAuthReq, StorePostCustomersReq } from "@medusajs/medusa";
import { useMutation } from "@tanstack/vue-query";

import { useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useAuth = () => {
  const client = useMedusaClient();
  const queryClient = useQueryClient();
  const { addCustomerToExistingWishlist } = useWishlist();
  const { snackbar } = useSnackbar();

  const { mutateAsync: logCustomerOut, isPending: isLoggingCustomerOut } = useMutation({
    mutationFn: () => client.auth.deleteSession(),
    onError: () => {
      snackbar.error("Something went wrong.");
    },
    onSuccess: () => {
      snackbar.success("Successfully logged out.");
      navigateTo("/");
      queryClient.resetQueries({ queryKey: [API_QUERY_KEY.SESSION] });
      queryClient.resetQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
  });

  const { mutateAsync: signCustomerIn, isPending: isSigningCustomerIn } = useMutation({
    mutationFn: (params: StorePostAuthReq) => client.auth.authenticate(params),
    onError: (error) => {
      console.error(error);
      snackbar.error("Something went wrong.");
    },
    onSuccess: async (data) => {
      navigateTo("/");
      snackbar.success("Successfully logged in.");

      if (!data.customer.wishlist_id) {
        await addCustomerToExistingWishlist(data.customer);
      }

      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SESSION] });
    },
  });

  const { mutateAsync: registerCustomer, isPending: isRegisteringCustomer } = useMutation({
    mutationFn: (params: StorePostCustomersReq) => client.customers.create(params),
    onError: (error) => {
      console.error(error);
      snackbar.error("Something went wrong.");
    },
    onSuccess: async (data) => {
      navigateTo("/");
      snackbar.success("Account created.");

      if (!data.customer.wishlist_id) {
        await addCustomerToExistingWishlist(data.customer);
      }

      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SESSION] });
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
