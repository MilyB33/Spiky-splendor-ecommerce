import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";
import type { Wishlist, WishlistItem } from "~/types";
import { useStorage } from "@vueuse/core";

type AddToWishlistParams = {
  wishlistID: string;
  productID: string;
};

type RemoveFromWishlistParams = {
  wishlistID: string;
  wishItemIDS: string[];
};

export const useWishlist = () => {
  const client = useMedusaClient();
  const { customer, isAuthenticated } = useCustomer();
  const { snackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { region } = useRegions();
  const storageWishlist = useStorage<string | null>(
    LOCAL_STORAGE_KEY.WISHLIST_ID,
    null,
    sessionStorage,
  );

  const wishlistId = computed(() => {
    return customer.value?.customer.wishlist_id || storageWishlist.value;
  });

  const invalidateQueries = () => {
    if (!customer.value?.customer.wishlist_id && isAuthenticated.value) {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    }

    queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.WISHLIST] });
  };

  const isWishlistEnabled = computed(() => !!wishlistId.value);

  const { data: wishlistData, isLoading } = useQuery({
    queryKey: [API_QUERY_KEY.WISHLIST],
    queryFn: (): Promise<Wishlist> =>
      client.client.request(
        "GET",
        `/store/wishlist/${wishlistId.value}?region_id=${region.value?.id}&currency_code=${region.value?.currency_code}`,
      ),
    enabled: isWishlistEnabled,
  });

  const { mutateAsync: createWishlistHandler, isPending: isCreatingWishlist } = useMutation({
    mutationFn: (): Promise<Wishlist> =>
      client.client.request("POST", `/store/wishlist/`, {
        region_id: region.value?.id,
        currency_code: region.value?.currency_code,
      }),
    onError: (error) => {
      console.error(error);
      snackbar.error("Can't create wishlist. Try again!");
    },
    onSuccess: () => {
      snackbar.success("Wishlist created!");
      invalidateQueries();
    },
  });

  const { mutate: addToWishlistHandler, isPending: isAddingToWishlist } = useMutation({
    mutationFn: ({ wishlistID, productID }: AddToWishlistParams): Promise<Wishlist> =>
      client.client.request("POST", `/store/wishlist/${wishlistID}/wish-item/`, {
        product_id: productID,
        region_id: region.value?.id,
        currency_code: region.value?.currency_code,
      }),
    onError: (error) => {
      console.error(error);
      snackbar.error("Nie można dodać produktu do ulubionych. Spróbuj ponownie!");
    },
    onSuccess: () => {
      snackbar.success("Produkt dodany do ulubionych!");
      invalidateQueries();
    },
  });

  const { mutate: removeFromWishlistHandler, isPending: isRemovingFromWishlist } = useMutation({
    mutationFn: ({ wishlistID, wishItemIDS }: RemoveFromWishlistParams): Promise<Wishlist> =>
      client.client.request("DELETE", `/store/wishlist/${wishlistID}/wish-item/`, {
        wish_items_ids: wishItemIDS,
        region_id: region.value?.id,
        currency_code: region.value?.currency_code,
      }),
    onError: (error) => {
      console.error(error);
      snackbar.error("Nie można usunąć produktu z ulubionych. Spróbuj ponownie!");
    },
    onSuccess: () => {
      snackbar.success("Produkt został usunięty z ulubionych!");
      invalidateQueries();
    },
  });

  const {
    mutate: addCustomerToExistingWishlistHandler,
    isPending: addingCustomerToExistingWishlist,
  } = useMutation({
    mutationFn: (wishlistID: string): Promise<Wishlist> =>
      // @ts-expect-error client doesn't support PATCH method
      client.client.request("PATCH", `/store/wishlist/${wishlistID}/`, {
        region_id: region.value?.id,
        currency_code: region.value?.currency_code,
      }),
    onError: (error) => {
      console.error(error);
      snackbar.error("Can't add customer to wishlist. Try again!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.WISHLIST] });
    },
  });

  const addToWishlist = async (data: Omit<AddToWishlistParams, "wishlistID">) => {
    if (!wishlistId.value) {
      const _wishlist = await createWishlistHandler();
      storageWishlist.value = _wishlist.id;
      addToWishlistHandler({ productID: data.productID, wishlistID: _wishlist.id });
      return;
    }

    addToWishlistHandler({ productID: data.productID, wishlistID: wishlistId.value });
  };

  const removeFromWishlist = async (data: Omit<RemoveFromWishlistParams, "wishlistID">) => {
    if (!wishlistId.value) {
      throw Error("No wishlist id");
    }

    removeFromWishlistHandler({ wishlistID: wishlistId.value, wishItemIDS: data.wishItemIDS });
  };

  const addCustomerToExistingWishlist = async () => {
    // TODO: This should also check this  !customer.value?.customer || customer.value?.customer.wishlist_id
    if (!wishlistId.value) return;

    return addCustomerToExistingWishlistHandler(wishlistId.value);
  };

  const wishlistItems = computed(() => wishlistData.value?.items || []);

  return {
    addToWishlist,
    removeFromWishlist,
    addCustomerToExistingWishlist,
    isFetchingWishlist: isLoading,
    isRemovingFromWishlist,
    isAddingToWishlist,
    isCreatingWishlist,
    addingCustomerToExistingWishlist,
    wishlist: wishlistItems,
  };
};
