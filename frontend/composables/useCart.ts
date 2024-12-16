import { useQuery, useMutation, useQueryClient, skipToken } from "@tanstack/vue-query";
import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";
import type { CartUpdateProps } from "@medusajs/medusa/dist/types/cart";

type UpdateCartParams = {
  cart_id: string;
} & CartUpdateProps;

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

  const { mutateAsync: updateCartHandler, isPending: isUpdatingCart } = useMutation({
    mutationFn: ({ cart_id, ...rest }: UpdateCartParams) => client.carts.update(cart_id, rest),
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

  const { mutateAsync: deleteLineItemHandler, isPending: isDeletingLineItem } = useMutation({
    mutationFn: (lineItemId: string) => client.carts.lineItems.delete(cartId.value, lineItemId),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      snackbar.success("Item removed from cart");
    },
  });

  const { mutateAsync: updateLineItemHandler, isPending: isUpdatingLineItem } = useMutation({
    mutationFn: ({ line_item_id, ...data }: UpdateLineItemParams) =>
      client.carts.lineItems.update(cartId.value, line_item_id, data),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutateAsync: addShippingMethodHandler, isPending: isAddingShippingMethod } = useMutation({
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

  const { mutateAsync: createPaymentSessionHandler, isPending: isCreatingPaymentSession } =
    useMutation({
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

  const { mutateAsync: completeCartHandler, isPending: isCompletingCart } = useMutation({
    mutationFn: () => client.carts.complete(cartId.value),
    onError: () => {
      snackbar.error("Something went wrong!");
    },
    onSuccess: () => {
      setCartId(null);
      queryClient.resetQueries({ queryKey: [API_QUERY_KEY.CART] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.ORDERS] });
    },
  });

  const shippingMethodsEnabled = computed(() => !!cart.value?.cart.id);

  const {
    data: shippingMethodsResponse,
    isLoading: isLoadingShippingMethods,
    isPending: isPendingShippingMethods,
  } = useQuery({
    queryKey: [API_QUERY_KEY.SHIPPING_METHODS],
    queryFn: () => {
      if (cart.value?.cart.id) {
        return client.shippingOptions.listCartOptions(cart.value?.cart.id);
      }
    },
    enabled: shippingMethodsEnabled,
  });

  const addItemToCart = async ({ variantId, quantity }: AddItemToCartParams) => {
    if (!cartId.value) {
      await createCartHandler();
    }

    return createLineItemHandler({ variantId, quantity });
  };

  const updateItemInCart = async (data: UpdateLineItemParams) => {
    if (!cart.value?.cart.id) return;

    return updateLineItemHandler(data);
  };

  const updateCart = async (data: Omit<UpdateCartParams, "cart_id">) => {
    if (!cart.value?.cart.id) return;

    return updateCartHandler({ cart_id: cart.value.cart.id, ...data });
  };

  const deleteItemFromCart = async (lineItemId: string) => {
    if (!cart.value?.cart.id) return;

    return deleteLineItemHandler(lineItemId);
  };

  const addShippingMethod = async (shippingMethodId: string) => {
    if (!cart.value?.cart.id) return;

    return addShippingMethodHandler(shippingMethodId);
  };

  const createPaymentSession = async () => {
    if (!cart.value?.cart.id) return;

    return createPaymentSessionHandler();
  };

  const completeCart = async () => {
    if (!cart.value?.cart.id && !cartId.value) return;

    return completeCartHandler();
  };

  const shippingMethods = computed(() => shippingMethodsResponse.value?.shipping_options || []);

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
    isCartEmpty,
    addItemToCart,
    updateItemInCart,
    updateCart,
    deleteItemFromCart,
    addShippingMethod,
    createPaymentSession,
    completeCart,
  };
};
