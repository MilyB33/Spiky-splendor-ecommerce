import type { Customer } from "@medusajs/medusa";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";
import type { Wishlist } from "~/types";
import { useStorage } from "@vueuse/core";

type StorageWishlistItem = {
  variantID: string;
  quantity: number;
};

type AddToWishlistParams = {
  customerID: string;
  variantID: string;
  quantity: number;
};

type RemoveFromWishlistParams = {
  customerID: string;
  variantID: string;
  index: number;
};

// TODO: Maybe wishlist can be fetched separately
export const useWishlist = () => {
  const client = useMedusaClient();
  const { customer } = useCustomer();
  const { snackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const storageWishlist = useStorage<StorageWishlistItem[]>("wishlist", []);

  const { mutate: addToWishlistHandler, isPending: isAddingToWishlist } = useMutation({
    mutationFn: ({ customerID, variantID, quantity }: AddToWishlistParams): Promise<Customer> =>
      client.customers.client.request("POST", `/store/customers/${customerID}/wishlist`, {
        variant_id: variantID,
        quantity,
      }),
    onError: (error) => {
      console.error(error);
      snackbar.error("Can't add item to wishlist. Try again!");
    },
    onSuccess: () => {
      snackbar.success("Item added to wishlist!");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
  });

  const { mutate: removeFromWishlistHandler, isPending: isRemovingFromWishlist } = useMutation({
    mutationFn: ({ customerID, index }: RemoveFromWishlistParams): Promise<Customer> =>
      client.customers.client.request("DELETE", `/store/customers/${customerID}/wishlist`, {
        index,
      }),
    onError: (error) => {
      console.error(error);
      snackbar.error("Can't remove item from wishlist. Try again!");
    },
    onSuccess: () => {
      snackbar.success("Item removed from wishlist!");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
  });

  const addToWishlist = async (params: Omit<AddToWishlistParams, "customerID">) => {
    storageWishlist.value = [...storageWishlist.value, params];

    if (customer.value?.customer.id) {
      addToWishlistHandler({ ...params, customerID: customer.value.customer.id });
    }
  };

  const removeFromWishlist = async (params: Omit<RemoveFromWishlistParams, "customerID">) => {
    storageWishlist.value = storageWishlist.value.filter(
      (item) => item.variantID === params.variantID,
    );

    if (customer.value?.customer.id) {
      removeFromWishlistHandler({ ...params, customerID: customer.value.customer.id });
    }
  };

  const wishlist = computed(() => (customer.value?.customer.metadata?.wishlist || []) as Wishlist);

  return {
    addToWishlist,
    removeFromWishlist,
    isRemovingFromWishlist,
    isAddingToWishlist,
    wishlist,
  };
};
