import { ProductPlantPlacementsPlantPlacement } from "../models/product-plant-placements-plant-placement";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const ProductPlantPlacementsPlantPlacementRepository =
  dataSource.getRepository(ProductPlantPlacementsPlantPlacement);
