import { useQuery, skipToken } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import { API_QUERY_KEY, COOKIES } from "~/constant";

export const useGetCart = (skipFetchingCart?: boolean) => {
  const client = useMedusaClient();
  const cookieCartId = useCookie(COOKIES.CART.KEY, { maxAge: COOKIES.CART.MAX_AGE });

  const isEnabled = computed(() => !!cookieCartId.value);

  const {
    data: cart,
    isLoading: isLoadingCart,
    isFetching: isFetchingCart,
    error: cartError,
    refetch: refetchCart,
  } = useQuery({
    queryKey: [API_QUERY_KEY.CART],
    queryFn: skipFetchingCart ? skipToken : () => client.carts.retrieve(cookieCartId.value!),
    enabled: isEnabled,
  });

  const isCartEmpty = computed(() => !!cart.value && !cart.value.cart.items.length);

  const cartId = computed(() => cart.value?.cart.id || cookieCartId.value || "");

  const setCartId = (id: string | null) => {
    cookieCartId.value = id;
  };

  watch(cartError, (newError) => {
    if (newError) {
      const err = newError as AxiosError;

      if (err.response?.status === 404) {
        setCartId(null);
      }
    }
  });

  return {
    cartId,
    cart,
    isFetchingCart,
    isLoadingCart,
    isCartEmpty,
    setCartId,
    refetchCart,
  };
};
