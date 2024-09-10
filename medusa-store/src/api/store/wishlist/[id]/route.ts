import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import WishlistService from "../../../../services/wishlist";
import { MedusaError } from "medusa-core-utils";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const idParam: string = req.params.id;

  const wishlist = await wishlistService.retrieve(idParam);

  res.json(wishlist);
};

export const PATCH = async (req: MedusaRequest, res: MedusaResponse) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const idParam: string = req.params.id;

  if (!req.user?.customer_id) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Unauthorized");
  }
  console.log(req.user.customer_id);
  const wishlist = await wishlistService.addCustomerToWishlist({
    id: idParam,
    customer_id: req.user.customer_id,
  });

  res.json(wishlist);
};
