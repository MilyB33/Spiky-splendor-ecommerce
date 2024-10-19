import "reflect-metadata";
import { PlantForm } from "./../models/plant-form";
import * as dotenv from "dotenv";

import { DataSource } from "typeorm";

try {
  dotenv.config({ path: "../../.env" });
} catch (e) {}

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME || "medusa",
  password: process.env.DATABASE_PASSWORD || "medusa",
  database: process.env.DATABASE_NAME || "medusa",
  entities: [PlantForm],
});

const run = async () => {
  console.info("Starting script...");

  await dataSource.initialize();

  const plantFormRepository = dataSource.getRepository(PlantForm);

  const plantForms = await plantFormRepository.find();

  console.info("Plant forms:", plantForms);

  console.info("Ending script...");
};

run();
