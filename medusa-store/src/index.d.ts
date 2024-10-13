import { Wishlist } from "./models/wishlist";
import { WishlistItem } from "./models/wishlist-item";

declare module "@medusajs/medusa/dist/models/customer" {
  export interface Customer {
    wishlist_id?: string;
    wishlist?: Wishlist;
  }
}

export declare module "@medusajs/medusa/dist/models/product" {
  declare interface Product {
    wishlist_item?: WishlistItem;
  }
}

export declare module "@medusajs/medusa/dist/models/product" {
  export interface Product {
    pot_diameter: number;
  }
}
