import { WishlistItem } from "../models/wishlist-item";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const WishlistItemRepository = dataSource.getRepository(WishlistItem);
