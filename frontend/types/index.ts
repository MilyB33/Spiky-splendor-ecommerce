// Types from medusa needs to be reassigned as imports in components can resolve typeorm

import {
  type ProductCategory as MedusaProductCategory,
  type StoreProductsListRes as MedusaProductsListResponse,
  type StoreRegionsListRes as MedusaRegionsListResponse,
  type StoreCartsRes as MedusaCartsRes,
  type Customer as MedusaCustomer,
  type Product as MedusaProduct,
  type Order as MedusaOrder,
  type LineItem as MedusaLineItem,
} from "@medusajs/medusa";

import { PLANT_PLACEMENT, WATER_DEMAND } from "~/constant";

export type ProductCategory = MedusaProductCategory;
export type ProductsListResponse = MedusaProductsListResponse;
export type RegionsListResponse = MedusaRegionsListResponse;
export type CartsRes = MedusaCartsRes;
export type Order = MedusaOrder;
export type LineItem = MedusaLineItem;

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

export type PlantForm = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Invoice = {
  id: string;
  name: string;
  display_id: string;
  order: Order;
  order_id: string;
  created_at: Date;
  updated_at: Date;
};

export type WaterDemandKey = keyof typeof WATER_DEMAND;
export type PlantPlacementKey = keyof typeof PLANT_PLACEMENT;

export type WaterDemand = (typeof WATER_DEMAND)[WaterDemandKey];
export type PlantPlacement = (typeof PLANT_PLACEMENT)[PlantPlacementKey];
