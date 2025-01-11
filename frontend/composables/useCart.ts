import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import type { CartUpdateProps } from "@medusajs/medusa/dist/types/cart";
import type { Customer } from "@medusajs/medusa";

type UpdateLineItemParams = {
  line_item_id: string;
  quantity: number;
};

type AddItemToCartParams = {
  variantId: string;
  quantity: number;
};

export const useCart = (skipFetchingCart?: boolean) => {
  const queryClient = useQueryClient();
  const client = useMedusaClient();
  const { snackbar } = useSnackbar();
  const { region } = useRegions();
  const { cartId, cart, isFetchingCart, isLoadingCart, isCartEmpty, setCartId } =
    useGetCart(skipFetchingCart);
  const { customer } = useCustomer();

  const { mutateAsync: updateCart, isPending: isUpdatingCart } = useMutation({
    mutationFn: ({ ...rest }: CartUpdateProps) => client.carts.update(cartId.value, rest),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SHIPPING_METHODS] });

      if (customer.value) {
        queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      }
    },
  });

  const { mutateAsync: createCartHandler, isPending: isCreatingCart } = useMutation({
    mutationFn: () => client.carts.create({ region_id: region.value?.id }),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: async (data) => {
      setCartId(data.cart.id);
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SHIPPING_METHODS] });

      if (customer.value) {
        queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      }
    },
  });

  const { mutateAsync: createLineItemHandler, isPending: isCreatingLineItem } = useMutation({
    mutationFn: ({ variantId, quantity }: AddItemToCartParams) =>
      client.carts.lineItems.create(cartId.value, {
        variant_id: variantId,
        quantity: quantity ?? 1,
      }),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      snackbar.success("Item added to cart");
    },
  });

  const { mutateAsync: deleteItemFromCart, isPending: isDeletingLineItem } = useMutation({
    mutationFn: (lineItemId: string) => client.carts.lineItems.delete(cartId.value, lineItemId),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      snackbar.success("Item removed from cart");
    },
  });

  const { mutateAsync: updateItemInCart, isPending: isUpdatingLineItem } = useMutation({
    mutationFn: ({ line_item_id, ...data }: UpdateLineItemParams) =>
      client.carts.lineItems.update(cartId.value, line_item_id, data),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutateAsync: addShippingMethod, isPending: isAddingShippingMethod } = useMutation({
    mutationFn: (shippingOptionId: string) =>
      client.carts.addShippingMethod(cartId.value, { option_id: shippingOptionId }),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutateAsync: selectPaymentSessionHandler, isPending: isSelectingPaymentSession } =
    useMutation({
      mutationFn: (paymentProviderId: string) =>
        client.carts.setPaymentSession(cartId.value, {
          provider_id: paymentProviderId,
        }),
      onError: () => {
        snackbar.error("Something went wrong!");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      },
    });

  const { mutateAsync: createPaymentSession, isPending: isCreatingPaymentSession } = useMutation({
    mutationFn: () => client.carts.createPaymentSessions(cart.value?.cart.id || ""),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: (data) => {
      const isStripeAvailable = data.cart.payment_sessions?.some(
        (session) => session.provider_id === "stripe",
      );

      if (!isStripeAvailable) {
        return;
      }

      selectPaymentSessionHandler("stripe");
    },
  });

  const { mutateAsync: completeCart, isPending: isCompletingCart } = useMutation({
    mutationFn: () => client.carts.complete(cartId.value),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: () => {
      setCartId(null);
      queryClient.setQueryData([API_QUERY_KEY.CART], () => null);
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
  });

  const shippingMethodsEnabled = computed(() => !!cart.value?.cart.id);

  const {
    data: shippingMethodsResponse,
    isLoading: isLoadingShippingMethods,
    isFetching: isFetchingShippingMethods,
    isPending: isPendingShippingMethods,
    refetch,
  } = useQuery({
    queryKey: [API_QUERY_KEY.SHIPPING_METHODS],
    queryFn: () => client.shippingOptions.listCartOptions(cart.value?.cart.id!),

    enabled: shippingMethodsEnabled,
  });

  watch(shippingMethodsResponse, (newValue) => {
    if (
      newValue?.shipping_options.length === 0 &&
      newValue.response.status === 200 &&
      !!cart.value?.cart.id &&
      !isFetchingShippingMethods.value
    ) {
      refetch();
    }
  });

  const addItemToCart = async ({ variantId, quantity }: AddItemToCartParams) => {
    try {
      if (!cartId.value) {
        await createCartHandler();
      }

      return createLineItemHandler({ variantId, quantity });
    } catch (error) {
      // handled in mutation query composable
    }
  };

  const shippingMethods = computed(() => shippingMethodsResponse.value?.shipping_options || []);

  const synchronizeCart = (customer: Omit<Customer, "password_hash">) => {
    try {
      if (!!customer && cart.value && !cart.value.cart.customer_id) {
        updateCart({ customer_id: customer.id });
      }

      if (
        !!customer &&
        !!cart.value?.cart.customer_id &&
        cart.value?.cart.customer_id !== customer.id
      ) {
        setCartId(null);
        queryClient.setQueryData([API_QUERY_KEY.CART], () => null);
      }
    } catch (error) {
      // handled in mutation query composable
    }
  };

  return {
    cart,
    shippingMethods,
    isCreatingCart,
    isFetchingCart,
    isLoadingCart,
    isUpdatingCart,
    isDeletingLineItem,
    isCreatingLineItem,
    isUpdatingLineItem,
    isAddingShippingMethod,
    isSelectingPaymentSession,
    isCreatingPaymentSession,
    isCompletingCart,
    isLoadingShippingMethods,
    isPendingShippingMethods,
    isFetchingShippingMethods,
    isCartEmpty,
    addItemToCart,
    updateItemInCart,
    updateCart,
    deleteItemFromCart,
    addShippingMethod,
    createPaymentSession,
    completeCart,
    synchronizeCart,
  };
};
