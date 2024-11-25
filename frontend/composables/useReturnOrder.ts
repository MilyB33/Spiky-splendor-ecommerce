import type { StorePostReturnsReq } from "@medusajs/medusa/dist/api/routes/store/returns/create-return";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useReturnOrder = () => {
  const queryClient = useQueryClient();
  const { snackbar } = useSnackbar();
  const { region } = useRegions();

  const client = useMedusaClient();

  const { data: shippingMethodsResponse, isLoading: isLoadingShippingMethods } = useQuery({
    queryKey: [API_QUERY_KEY.RETURN_SHIPPING_METHODS],
    queryFn: () => client.shippingOptions.list({ is_return: "true", region_id: region.value?.id }),
  });

  const { mutateAsync: createReturn, isPending: isCreatingReturn } = useMutation({
    mutationFn: (returnData: StorePostReturnsReq) => client.returns.create(returnData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.RETURNS] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.ORDERS] });
      snackbar.success("Zwrot został utworzony!");
    },
    onError: () => {
      snackbar.error("Coś poszło nie tak, spróbuj jeszcze raz.");
    },
  });

  const shippingMethods = computed(() => shippingMethodsResponse.value?.shipping_options || []);

  return { createReturn, isCreatingReturn, shippingMethods, isLoadingShippingMethods };
};
