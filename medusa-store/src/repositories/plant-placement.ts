import { PlantPlacement } from "../models/plant-placement";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const PlantPlacementRepository =
  dataSource.getRepository(PlantPlacement);
