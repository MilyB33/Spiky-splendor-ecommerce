import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import WishlistService from "../../../services/wishlist";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const payload: { customer_id: string | undefined } = {
    customer_id: undefined,
  };

  if (req.user?.customer_id) {
    payload.customer_id = req.user.customer_id;
  }

  const wishlist = await wishlistService.create(payload);

  res.json(wishlist);
};