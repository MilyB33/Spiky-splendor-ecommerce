import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import WishlistService from "../../../../../services/wishlist";
import { MedusaError } from "medusa-core-utils";

export const POST = async (
  req: MedusaRequest & { body: { product_id: string } },
  res: MedusaResponse
) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const body = req.body as {
    region_id: string;
    currency_code: string;
    product_id: string;
  };

  const idParam: string = req.params.id;

  const wishlist = await wishlistService.addWishItem({
    wishlist_id: idParam,
    ...body,
  });

  res.json(wishlist);
};

export const DELETE = async (
  req: MedusaRequest & { body: { wish_items_ids: string[] } },
  res: MedusaResponse
) => {
  const wishlistService: WishlistService = req.scope.resolve("wishlistService");

  const body = req.body as {
    region_id: string;
    currency_code: string;
    wish_items_ids: string[];
  };

  const { wish_items_ids, ...rest } = body;
  const idParam: string = req.params.id;

  if (!wish_items_ids)
    throw new MedusaError(
      MedusaError.Types.INVALID_ARGUMENT,
      "Invalid argument"
    );

  const wishlist = await wishlistService.removeWishItem({
    wishlist_id: idParam,
    ids: wish_items_ids,
    ...rest,
  });

  res.json(wishlist);
};
