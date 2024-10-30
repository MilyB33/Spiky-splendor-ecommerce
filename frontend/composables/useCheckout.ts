import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useCheckout = () => {
  const client = useMedusaClient();
  const { cart } = useCart();

  // TODO: Move to useCart
  const { data: shippingMethodsResponse, isLoading: isFetchingShippingMethods } = useQuery({
    queryKey: [API_QUERY_KEY.SHIPPING_METHODS],
    queryFn: () => {
      if (cart.value?.cart.id) {
        return client.shippingOptions.listCartOptions(cart.value?.cart.id);
      }
    },
    // enabled: computed(() => !!cart.value?.cart.id).value,
  });

  const shippingMethods = computed(() => shippingMethodsResponse.value?.shipping_options || []);

  return { shippingMethods, isFetchingShippingMethods };
};
