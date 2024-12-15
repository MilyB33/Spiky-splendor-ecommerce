import { useQuery, skipToken } from "@tanstack/vue-query";
import { useStorage } from "@vueuse/core";
import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";

export const useGetCart = (skipFetchingCart?: boolean) => {
  const client = useMedusaClient();
  const localStorageCartValue = useStorage(LOCAL_STORAGE_KEY.CART_ID, "");

  const isEnabled = computed(() => !!localStorageCartValue.value);

  const {
    data: cart,
    isLoading: isLoadingCart,
    isFetching: isFetchingCart,
  } = useQuery({
    queryKey: [API_QUERY_KEY.CART],
    queryFn: skipFetchingCart
      ? skipToken
      : () => client.carts.retrieve(localStorageCartValue.value),
    enabled: isEnabled,
  });

  const isCartEmpty = computed(() => !!cart.value && !cart.value.cart.items.length);

  return {
    localStorageCartValue,
    cart,
    isFetchingCart,
    isLoadingCart,
    isCartEmpty,
  };
};
