import { Invoice } from "./models/invoice";
import { Wishlist } from "./models/wishlist";
import { WishlistItem } from "./models/wishlist-item";
import { WaterDemand, PlantPlacement, PlantForm } from "./types/product";

declare module "@medusajs/medusa/dist/models/store" {
  export interface Store {
    company: string;
    city: string;
    postal_code: string;
    address: string;
  }
}

declare module "@medusajs/medusa/dist/models/customer" {
  export interface Customer {
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
    plant_forms_ids: string[];
    min_height: number;
    max_height: number;
    water_demand: WaterDemand;
  }
}

export declare module "@medusajs/medusa/dist/models/order" {
  export interface Order {
    invoice?: Invoice;
  }
}

export declare module "@medusajs/medusa/dist/api/routes/admin/products/update-product" {
  export interface AdminPostProductsProductReq {
    pot_diameter?: number;
    plant_forms?: string[];
    plant_placements?: PlantPlacement[];
    min_height?: number;
    max_height?: number;
  }
}

export declare module "@medusajs/medusa/dist/api/routes/admin/store/update-store" {
  export interface AdminPostStoreReq {
    company?: string;
    city?: string;
    postal_code?: string;
    address?: string;
  }
}
