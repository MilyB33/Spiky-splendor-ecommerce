import { useMutation } from "@tanstack/vue-query";

import { useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useAuth = () => {
  const client = useMedusaClient();
  const queryClient = useQueryClient();
  const { snackbar } = useSnackbar();

  const { mutate: logCustomerOut, isPending: isLoggingCustomerOut } = useMutation({
    mutationFn: () => client.auth.deleteSession(),
    onError: () => {
      snackbar.error("Something went wrong.");
    },
    onSuccess: () => {
      snackbar.success("Successfully logged out.");
      navigateTo("/");
      queryClient.resetQueries({ queryKey: [API_QUERY_KEY.CUSTOMER], exact: true });
    },
  });

  return {
    isLoggingCustomerOut,
    logCustomerOut,
  };
};
