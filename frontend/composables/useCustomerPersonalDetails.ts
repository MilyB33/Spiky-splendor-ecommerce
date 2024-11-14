import type { Customer } from "@medusajs/medusa";
import { useMutation } from "@tanstack/vue-query";

import { useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

type CustomerUpdatePayload = Partial<
  Pick<Customer, "first_name" | "last_name" | "phone" | "email">
>;

export const useCustomerPersonalDetails = () => {
  const queryClient = useQueryClient();
  const client = useMedusaClient();
  const { snackbar } = useSnackbar();

  const { mutateAsync: updateCustomer, isPending: isUpdatingCustomer } = useMutation({
    mutationFn: (data: CustomerUpdatePayload) => client.customers.update(data),
    onSuccess: () => {
      snackbar.success("Zaktualizowano");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
    onError: () => {
      snackbar.error("Coś poszło nie tak, spróbuj jeszcze raz");
    },
  });

  return {
    updateCustomer,
    isUpdatingCustomer,
  };
};
