import { PlantForm } from "../models/plant-form";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const PlantFormRepository = dataSource.getRepository(PlantForm);
