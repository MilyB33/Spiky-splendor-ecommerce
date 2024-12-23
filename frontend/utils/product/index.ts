import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { PRODUCT_AVAILABILITY, PRODUCT_LOW_STOCK_THRESHOLD } from "../../constant";

export const getProductQuantity = (product?: PricedProduct) => {
  if (!product) return 0;

  return product.variants.reduce((prev, curr) => {
    return prev + (curr.inventory_quantity || 0);
  }, 0);
};

export const getProductAvailabilityStatus = (product: PricedProduct) => {
  const productQuantity = getProductQuantity(product);

  if (productQuantity === 0) {
    return PRODUCT_AVAILABILITY.OUT_OF_STOCK;
  }

  if (productQuantity <= PRODUCT_LOW_STOCK_THRESHOLD) {
    return PRODUCT_AVAILABILITY.LOW_STOCK;
  }

  return PRODUCT_AVAILABILITY.AVAILABLE;
};

const convertToDecimal = (amount: number) => {
  return Math.floor(amount) / 100;
};

export const formatCurrency = (price: number | undefined, currencyCode: string = "pln") => {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: currencyCode,
  }).format(convertToDecimal(price || 0));
};
