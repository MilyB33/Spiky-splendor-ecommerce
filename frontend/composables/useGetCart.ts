import { useQuery, skipToken } from "@tanstack/vue-query";
import { useStorage } from "@vueuse/core";
import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";

export const useGetCart = (skipFetchingCart?: boolean) => {
  const client = useMedusaClient();
  const localStorageCartValue = useStorage(LOCAL_STORAGE_KEY.CART_ID, "");

  const {
    data: cart,
    isLoading: isFetchingCart,
    isFetching: isLoadingCart,
  } = useQuery({
    queryKey: [API_QUERY_KEY.CART],
    queryFn: skipFetchingCart
      ? skipToken
      : () => client.carts.retrieve(localStorageCartValue.value),
    enabled: computed(() => !!localStorageCartValue.value).value,
  });

  const isCartEmpty = computed(() => !!cart.value && !cart.value.cart.items.length);

  return {
    cart,
    isFetchingCart,
    isLoadingCart,
    isCartEmpty,
  };
};
