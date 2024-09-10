import { Wishlist } from "../models/wishlist";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const WishlistRepository = dataSource.getRepository(Wishlist);
