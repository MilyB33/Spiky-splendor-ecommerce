import "reflect-metadata";
import * as dotenv from "dotenv";
import { ConfigModule, MedusaContainer } from "@medusajs/medusa";
import { PlantFormRepository } from "../repositories/plant-form";
import { ProductRepository } from "@medusajs/medusa/dist/repositories/product";
import data from "../custom-data/custom-seed.json";
import { PlantForm } from "../models/plant-form";
import { ProductPlantFormsPlantFormRepository } from "../repositories/product-plant-forms-plant-form";

// TODO: change this to be absolute path
try {
  dotenv.config({ path: "../../.env" });
} catch (e) {}

export default async (
  container: MedusaContainer,
  _config: ConfigModule
): Promise<void> => {
  console.info("Starting loader...");

  await writePlantFormsToDatabase(container);
  await associatePlantFormsWithProducts(container);

  console.info("Ending loader...");
};

const writePlantFormsToDatabase = async (container: MedusaContainer) => {
  const plantFormRepository = container.resolve<typeof PlantFormRepository>(
    "plantFormRepository"
  );

  data.plant_forms.forEach(async (plantForm) => {
    const existingPlant = await plantFormRepository.findOne({
      where: { name: plantForm.name },
    });

    if (!existingPlant) {
      await plantFormRepository.save({
        id: plantForm.id,
        name: plantForm.name,
      });
    } else {
      console.log("Plant form found in database. Skipping.");
    }

    console.log("Plant forms written to database.");
  });
};

const getRandomPlantForms = (
  plantForms: PlantForm[],
  max: number = 3
): PlantForm[] => {
  const shuffled = [...plantForms].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * max) + 1);
};

const associatePlantFormsWithProducts = async (container: MedusaContainer) => {
  const plantFormRepository = container.resolve<typeof PlantFormRepository>(
    "plantFormRepository"
  );
  const productRepository =
    container.resolve<typeof ProductRepository>("productRepository");
  const productPlantFormRepository = container.resolve<
    typeof ProductPlantFormsPlantFormRepository
  >("productPlantFormsPlantFormRepository");

  const plantForms = await plantFormRepository.find();
  const products = await productRepository.find();

  for (const product of products) {
    const randomPlantForms = getRandomPlantForms(plantForms);

    // Add new associations
    const productPlantForms = randomPlantForms.map((plantForm) => {
      return {
        product_id: product.id,
        plant_form_id: plantForm.id,
      };
    });

    productPlantForms.forEach(async (productPlantForm) => {
      await productPlantFormRepository.save({
        product_id: productPlantForm.product_id,
        plant_form_id: productPlantForm.plant_form_id,
      });
    });
  }

  console.log("Plant forms associated with products successfully.");
};
