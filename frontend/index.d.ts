import { Wishlist, PlantForm, PlantPlacement, PlantWaterDemand } from "./types/index";

declare module "@medusajs/medusa/dist/models/customer" {
  export interface Customer {
    wishlist_id?: string;
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
    plant_water_demand: PlantWaterDemand;
    plant_water_demand_id: string;
  }
}

declare module "@medusajs/medusa/dist/api/routes/store/products" {
  export interface StoreGetProductsParams {
    plant_forms_ids?: string[];
    plant_placements_ids?: string[];
    plant_water_demand_ids?: string[];
    categories_ids?: string[];
    min_price?: number;
    max_price?: number;
    is_search?: boolean;
  }
}
