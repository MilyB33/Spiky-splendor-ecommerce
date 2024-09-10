// Types from medusa needs to be reassigned as imports in components can resolve typeorm

import {
  type ProductCategory as MedusaProductCategory,
  type StoreProductsListRes as MedusaProductsListResponse,
  type StoreRegionsListRes as MedusaRegionsListResponse,
  type LineItem as MedusaLineItem,
  type Customer as MedusaCustomer,
  type Product as MedusaProduct,
} from "@medusajs/medusa";

export type ProductCategory = MedusaProductCategory;
export type ProductsListResponse = MedusaProductsListResponse;
export type RegionsListResponse = MedusaRegionsListResponse;

// Wishlist
export type WishlistItem = {
  id: string;
  wishlist: Wishlist;
  product_id: string;
  product: MedusaProduct;
};

export type Wishlist = {
  id: string;
  customer_id: string;
  customer: MedusaCustomer;
  items: WishlistItem[];
};
