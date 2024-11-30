import { Wishlist } from "src/models/wishlist";

export type CreateWishlistStateInput = {
  customer_id?: string;
  region_id: string;
  currency_code: string;
};

export type RetrieveWishlistStateInput = {
  id: string;
  region_id: string;
  currency_code: string;
};

export type AddWishlistItemStateInput = {
  wishlist_id: string;
  product_id: string;
  region_id: string;
  currency_code: string;
};

export type RemoveWishlistItemStateInput = {
  ids: string[];
  wishlist_id: string;
  region_id: string;
  currency_code: string;
};

export type AddCustomerToWishlistItemStateInput = {
  region_id: string;
  currency_code: string;
} & Pick<Wishlist, "customer_id" | "id">;
