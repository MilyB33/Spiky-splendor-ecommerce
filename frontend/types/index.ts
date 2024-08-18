// Types from medusa needs to be reassigned as imports in components can resolve typeorm

import { type ProductCategory as MedusaProductCategory } from "@medusajs/medusa";

export type ProductCategory = MedusaProductCategory;
