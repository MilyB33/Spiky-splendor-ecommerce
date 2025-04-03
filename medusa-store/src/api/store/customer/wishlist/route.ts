import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import WishlistService from "../../../../services/wishlist";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const customer_id = req.user.customer_id;
  const region_id: string = req.query.region_id as string;
  const currency_code: string = req.query.currency_code as string;

  const wishlist = await wishlistService.userWishlist({
    customer_id,
    region_id,
    currency_code,
  });

  res.json(wishlist);
};
