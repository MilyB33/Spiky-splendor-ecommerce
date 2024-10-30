import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import WishlistService from "../../../../../services/wishlist";
import { MedusaError } from "medusa-core-utils";

export const POST = async (
  req: MedusaRequest & { body: { product_id: string } },
  res: MedusaResponse
) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const idParam: string = req.params.id;
  const product_id: string = req.body.product_id;

  const wishlist = await wishlistService.addWishItem(idParam, product_id);

  res.json(wishlist);
};

export const DELETE = async (
  req: MedusaRequest & { body: { wish_items_ids: string[] } },
  res: MedusaResponse
) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const idParam: string = req.params.id;
  const wishItemsIds: string[] = req.body.wish_items_ids;

  if (!wishItemsIds)
    throw new MedusaError(
      MedusaError.Types.INVALID_ARGUMENT,
      "Invalid argument"
    );

  const wishlist = await wishlistService.removeWishItem(wishItemsIds, idParam);

  res.json(wishlist);
};
