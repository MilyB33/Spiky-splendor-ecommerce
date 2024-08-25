// Types from medusa needs to be reassigned as imports in components can resolve typeorm

import {
  type ProductCategory as MedusaProductCategory,
  type StoreProductsListRes as MedusaProductsListResponse,
} from "@medusajs/medusa";

export type ProductCategory = MedusaProductCategory;
export type ProductsListResponse = MedusaProductsListResponse;
