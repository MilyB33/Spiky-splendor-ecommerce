import { PlantForm } from "./models/plant-form";
import { PlantPlacement } from "./models/plant-placement";
import { Wishlist } from "./models/wishlist";
import { WishlistItem } from "./models/wishlist-item";

declare module "@medusajs/medusa/dist/models/customer" {
  export interface Customer {
    wishlist_id?: string;
    wishlist?: Wishlist;
    orders_count?: number;
    returns_count?: number;
  }
}

export declare module "@medusajs/medusa/dist/models/product" {
  declare interface Product {
    wishlist_item?: WishlistItem;
  }
}

export declare module "@medusajs/medusa/dist/models/product" {
  export interface Product {
    pot_diameter: number;
    plant_forms: PlantForm[];
    plant_placements: PlantPlacement[];
    plant_water_demand: PlantWaterDemand;
    plant_water_demand_id: string;
  }
}
