import { ProductPlantFormsPlantForm } from "../models/product-plant-forms-plant-form";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const ProductPlantFormsPlantFormRepository = dataSource.getRepository(
  ProductPlantFormsPlantForm
);
