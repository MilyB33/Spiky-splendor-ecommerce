// Types from medusa needs to be reassigned as imports in components can resolve typeorm

import {
  type ProductCategory as MedusaProductCategory,
  type StoreProductsListRes as MedusaProductsListResponse,
  type StoreRegionsListRes as MedusaRegionsListResponse,
  type LineItem as MedusaLineItem,
} from "@medusajs/medusa";

export type ProductCategory = MedusaProductCategory;
export type ProductsListResponse = MedusaProductsListResponse;
export type RegionsListResponse = MedusaRegionsListResponse;

// Wishlist
export type Wishlist = ({ title: string } & MedusaLineItem)[];
