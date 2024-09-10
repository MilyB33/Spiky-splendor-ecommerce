import { Wishlist } from "./types/index";

declare module "@medusajs/medusa/dist/models/customer" {
  export interface Customer {
    wishlist_id?: string;
    wishlist?: Wishlist;
  }
}
