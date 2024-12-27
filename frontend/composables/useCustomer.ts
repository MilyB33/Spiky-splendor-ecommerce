import type { Customer } from "@medusajs/medusa";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

type CustomerUpdatePayload = Partial<
  Pick<Customer, "first_name" | "last_name" | "phone" | "email">
>;

export const useCustomer = () => {
  const client = useMedusaClient();
  const queryClient = useQueryClient();
  const { snackbar } = useSnackbar();
  const { customer, isAuthenticated, isLoadingCustomer, isPendingCustomer } = useGetCustomer();

  const { mutateAsync: updateCustomer, isPending: isUpdatingCustomer } = useMutation({
    mutationFn: (data: CustomerUpdatePayload) => client.customers.update(data),
    onSuccess: () => {
      snackbar.success("Updated");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
    onError: () => {
      snackbar.error("Something went wrong, please try again");
    },
  });

  const { mutateAsync: deactivateCustomer, isPending: isDeactivatingCustomer } = useMutation({
    mutationFn: () => client.customers.client.request("DELETE", "/store/customer/deactivate/"),
    onSuccess: async () => {
      await client.auth.deleteSession();
      queryClient.resetQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.resetQueries({ queryKey: [API_QUERY_KEY.SESSION] });
      snackbar.success("Successfully deactivated account!");
      navigateTo("/");
    },
    onError: () => {
      snackbar.error("Something went wrong, please try again");
    },
  });

  return {
    customer,
    isAuthenticated,
    isLoadingCustomer,
    isPendingCustomer,
    isUpdatingCustomer,
    isDeactivatingCustomer,
    updateCustomer,
    deactivateCustomer,
  };
};
