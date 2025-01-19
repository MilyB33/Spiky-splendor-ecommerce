import type { Customer } from "@medusajs/medusa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import { API_QUERY_KEY, COOKIES } from "~/constant";
import type { Wishlist } from "~/types";

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
  const cookieWishlistId = useCookie(COOKIES.WISHLIST.KEY, { maxAge: COOKIES.WISHLIST.MAX_AGE });

  const wishlistId = computed(() => {
    return customer.value?.customer.wishlist_id || cookieWishlistId.value;
  });

  const invalidateQueries = () => {
    if (!customer.value?.customer.wishlist_id && isAuthenticated.value) {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    }

    queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.WISHLIST] });
  };

  const isWishlistEnabled = computed(() => !!wishlistId.value);

  const {
    data: wishlistData,
    error: wishlistError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [API_QUERY_KEY.WISHLIST],
    queryFn: (): Promise<Wishlist> =>
      client.client.request(
        "GET",
        `/store/wishlist/${wishlistId.value}?region_id=${region.value?.id}&currency_code=${region.value?.currency_code}`,
      ),
    enabled: isWishlistEnabled,
    retry: 2,
  });

  watch(wishlistError, (newError) => {
    if (newError) {
      const err = newError as AxiosError;

      if (err.response?.status === 404) {
        cookieWishlistId.value = null;
      }
    }
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
      snackbar.error("Unable to add product to favorites. Please try again!");
    },
    onSuccess: () => {
      snackbar.success("Product added to favorites!");
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
      snackbar.error("The product cannot be removed from favorites. Please try again!");
    },
    onSuccess: () => {
      snackbar.success("The product has been removed from favorites!");
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
    try {
      if (!wishlistId.value) {
        const _wishlist = await createWishlistHandler();
        cookieWishlistId.value = _wishlist.id;
        addToWishlistHandler({ productID: data.productID, wishlistID: _wishlist.id });
        return;
      }

      addToWishlistHandler({ productID: data.productID, wishlistID: wishlistId.value });
    } catch (error) {
      // handled in mutation query composable
    }
  };

  const removeFromWishlist = async (data: Omit<RemoveFromWishlistParams, "wishlistID">) => {
    if (!wishlistId.value) {
      throw Error("No wishlist id");
    }

    removeFromWishlistHandler({ wishlistID: wishlistId.value, wishItemIDS: data.wishItemIDS });
  };

  const addCustomerToExistingWishlist = async (customer: Omit<Customer, "password_hash">) => {
    if (!wishlistId.value || customer.wishlist_id) return;

    return addCustomerToExistingWishlistHandler(wishlistId.value);
  };

  const synchronizeWishlist = (customer?: Omit<Customer, "password_hash">) => {
    if (!!customer && !customer.wishlist_id && !wishlistData.value?.customer_id) {
      addCustomerToExistingWishlist(customer);
      return;
    }

    if (!!customer && !customer.wishlist_id && !!wishlistData.value?.customer_id) {
      cookieWishlistId.value = null;
      queryClient.setQueryData([API_QUERY_KEY.WISHLIST], () => null);
      return;
    }

    if (!!customer && customer.wishlist_id !== cookieWishlistId.value) {
      cookieWishlistId.value = customer.wishlist_id;
      refetch();
    }
  };

  const wishlistItems = computed(() => wishlistData.value?.items || []);

  return {
    addToWishlist,
    removeFromWishlist,
    addCustomerToExistingWishlist,
    synchronizeWishlist,
    isFetchingWishlist: isLoading,
    isRemovingFromWishlist,
    isAddingToWishlist,
    isCreatingWishlist,
    addingCustomerToExistingWishlist,
    wishlist: wishlistItems,
  };
};
