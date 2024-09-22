import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { useStorage } from "@vueuse/core";
import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";
import { useCommonStore } from "~/store/common";

type UpdateCartParams = {
  cart_id: string;
  customer_id?: string;
  region_id?: string;
};

type UpdateLineItemParams = {
  line_item_id: string;
  quantity: number;
};

// TODO: add snackbars (they can't be used when we use it within use initialize)
export const useCart = () => {
  const commonStore = useCommonStore();
  const queryClient = useQueryClient();
  const { customer } = useCustomer();
  const client = useMedusaClient();
  const localStorageCartValue = useStorage(LOCAL_STORAGE_KEY.CART_ID, "");

  const { selectedRegion } = storeToRefs(commonStore);

  const { data: cart, isPaused: isFetchingCart } = useQuery({
    queryKey: [API_QUERY_KEY.CART],
    queryFn: () => client.carts.retrieve(localStorageCartValue.value),
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
    },
  });

  const { mutate: createLineItemHandler, isPending: isCreatingLineItem } = useMutation({
    mutationFn: (variantId: string) =>
      client.carts.lineItems.create(localStorageCartValue.value, {
        variant_id: variantId,
        quantity: 1,
      }),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutate: deleteLineItemHandler, isPending: isDeletingLineItem } = useMutation({
    mutationFn: (lineItemId: string) =>
      client.carts.lineItems.delete(localStorageCartValue.value, lineItemId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const { mutate: updateLineItemHandler, isPending: isUpdatingLineItem } = useMutation({
    mutationFn: ({ line_item_id, ...data }: UpdateLineItemParams) =>
      client.carts.lineItems.update(localStorageCartValue.value, line_item_id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CART] });
    },
  });

  const addItemToCart = async (variantId: string) => {
    if (!localStorageCartValue.value) {
      await createCartHandler();
    }

    createLineItemHandler(variantId);
  };

  const updateItemInCart = async (data: UpdateLineItemParams) => {
    if (!cart.value?.cart.id) return;

    updateLineItemHandler(data);
  };

  const updateCart = (data: Omit<UpdateCartParams, "cart_id">) => {
    if (!cart.value?.cart.id) return;

    updateCartHandler({ cart_id: cart.value.cart.id, ...data });
  };

  const deleteItemFromCart = (lineItemId: string) => {
    if (!cart.value?.cart.id) return;

    deleteLineItemHandler(lineItemId);
  };

  return {
    cart,
    isCreatingCart,
    isFetchingCart,
    isUpdatingCart,
    isDeletingLineItem,
    isCreatingLineItem,
    isUpdatingLineItem,
    addItemToCart,
    updateItemInCart,
    updateCart,
    deleteItemFromCart,
  };
};
