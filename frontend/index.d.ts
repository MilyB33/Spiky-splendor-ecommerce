import { Wishlist, PlantForm, PlantPlacement, type Invoice, WaterDemand } from "./types/index";

declare module "@medusajs/medusa/dist/models/customer" {
  export interface Customer {
    wishlist?: Wishlist;
    orders_count?: number;
    returns_count?: number;
  }
}

declare module "@medusajs/medusa/dist/models/product" {
  export interface Product {
    pot_diameter: number;
    min_height: number;
    max_height: number;
    plant_forms: PlantForm[];
    plant_placements: PlantPlacement[];
    water_demand: WaterDemand;
  }
}

declare module "@medusajs/medusa/dist/api/routes/store/products" {
  export interface StoreGetProductsParams {
    plant_forms?: PlantForm[];
    plant_placements?: PlantPlacement[];
    water_demand?: WaterDemand[];
    categories_ids?: string[];
    min_price?: number;
    max_price?: number;
    is_search?: boolean;
    region?: string;
  }
}

declare module "@medusajs/medusa/dist/models/order" {
  export interface Order {
    invoice?: Invoice;
  }
}
