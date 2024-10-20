import { useQuery, useMutation, useQueryClient, skipToken } from "@tanstack/vue-query";
import { useStorage } from "@vueuse/core";
import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";
import { useCommonStore } from "~/store/common";
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

// TODO: add snackbars (they can't be used when we use it within use initialize)
export const useCart = (skipFetchingCart?: boolean) => {
  const commonStore = useCommonStore();
  const queryClient = useQueryClient();
  const { customer } = useCustomer();
  const client = useMedusaClient();
  const localStorageCartValue = useStorage(LOCAL_STORAGE_KEY.CART_ID, "");

  const { selectedRegion } = storeToRefs(commonStore);

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

  const { mutateAsync: updateCartHandler, isPending: isUpdatingCart } = useMutation({
    mutationFn: ({ cart_id, ...rest }: UpdateCartParams) => client.carts.update(cart_id, rest),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      // For changing region
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SHIPPING_METHODS] });
    },
  });

  const { mutateAsync: createCartHandler, isPending: isCreatingCart } = useMutation({
    mutationFn: () => client.carts.create({ region_id: selectedRegion.value?.id }),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: async (data) => {
      localStorageCartValue.value = data.cart.id;
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });

      if (customer.value?.customer.id) {
        await updateCartHandler({ cart_id: data.cart.id, customer_id: customer.value.customer.id });
      }

      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.SHIPPING_METHODS] });
    },
  });

  const { mutateAsync: createLineItemHandler, isPending: isCreatingLineItem } = useMutation({
    mutationFn: ({ variantId, quantity }: AddItemToCartParams) =>
      client.carts.lineItems.create(localStorageCartValue.value, {
        variant_id: variantId,
        quantity: quantity ?? 1,
      }),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutateAsync: deleteLineItemHandler, isPending: isDeletingLineItem } = useMutation({
    mutationFn: (lineItemId: string) =>
      client.carts.lineItems.delete(localStorageCartValue.value, lineItemId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutateAsync: updateLineItemHandler, isPending: isUpdatingLineItem } = useMutation({
    mutationFn: ({ line_item_id, ...data }: UpdateLineItemParams) =>
      client.carts.lineItems.update(localStorageCartValue.value, line_item_id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutateAsync: addShippingMethodHandler, isPending: isAddingShippingMethod } = useMutation({
    mutationFn: (shippingOptionId: string) =>
      client.carts.addShippingMethod(localStorageCartValue.value, { option_id: shippingOptionId }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutateAsync: selectPaymentSessionHandler, isPending: isSelectingPaymentSession } =
    useMutation({
      mutationFn: (paymentProviderId: string) =>
        client.carts.setPaymentSession(localStorageCartValue.value, {
          provider_id: paymentProviderId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
      },
    });

  const { mutateAsync: createPaymentSessionHandler, isPending: isCreatingPaymentSession } =
    useMutation({
      mutationFn: () => client.carts.createPaymentSessions(localStorageCartValue.value),
      onSuccess: (data) => {
        // check if stripe is selected
        const isStripeAvailable = data.cart.payment_sessions?.some(
          (session) => session.provider_id === "stripe",
        );

        if (!isStripeAvailable) {
          return;
        }

        // select payment session
        selectPaymentSessionHandler("stripe");
      },
    });

  const { mutateAsync: completeCartHandler, isPending: isCompletingCart } = useMutation({
    mutationFn: () => client.carts.complete(localStorageCartValue.value),
    onSuccess: (data) => {
      localStorageCartValue.value = "";
      queryClient.resetQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const addItemToCart = async ({ variantId, quantity }: AddItemToCartParams) => {
    if (!localStorageCartValue.value) {
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
    if (!cart.value?.cart.id) return;

    return completeCartHandler();
  };

  return {
    cart,
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
    addItemToCart,
    updateItemInCart,
    updateCart,
    deleteItemFromCart,
    addShippingMethod,
    createPaymentSession,
    completeCart,
  };
};
