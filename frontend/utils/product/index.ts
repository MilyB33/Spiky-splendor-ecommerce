import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { PRODUCT_AVAILABILITY, PRODUCT_LOW_STOCK_THRESHOLD } from "../../constant";

export const getProductAvailabilityStatus = (product: PricedProduct) => {
  // TODO: This should be handled on backend
  const productQuantity = product.variants.reduce((prev, curr) => {
    return prev + (curr.inventory_quantity || 0);
  }, 0);

  if (productQuantity === 0) {
    return PRODUCT_AVAILABILITY.OUT_OF_STOCK;
  }

  if (productQuantity <= PRODUCT_LOW_STOCK_THRESHOLD) {
    return PRODUCT_AVAILABILITY.LOW_STOCK;
  }

  return PRODUCT_AVAILABILITY.AVAILABLE;
};
