import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import WishlistService from "../../../../services/wishlist";
import { MedusaError } from "medusa-core-utils";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const id: string = req.params.id;
  const region_id: string = req.query.region_id as string;
  const currency_code: string = req.query.currency_code as string;

  const wishlist = await wishlistService.retrieve({
    id,
    region_id,
    currency_code,
  });

  res.json(wishlist);
};

export const PATCH = async (req: MedusaRequest, res: MedusaResponse) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const body = req.body as { region_id: string; currency_code: string };

  const idParam: string = req.params.id;

  if (!req.user?.customer_id) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Unauthorized");
  }

  const wishlist = await wishlistService.addCustomerToWishlist({
    id: idParam,
    customer_id: req.user.customer_id,
    ...body,
  });

  res.json(wishlist);
};
