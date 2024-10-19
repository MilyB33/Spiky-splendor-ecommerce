import { PlantWaterDemand } from "../models/plant-water-demand";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const PlantWaterDemandRepository =
  dataSource.getRepository(PlantWaterDemand);
