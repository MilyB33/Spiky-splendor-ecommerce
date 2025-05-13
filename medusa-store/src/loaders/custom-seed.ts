import "reflect-metadata";
import * as dotenv from "dotenv";
import { ConfigModule, MedusaContainer } from "@medusajs/medusa";

try {
  dotenv.config({ path: "../../.env" });
} catch (e) {}

export default async (
  container: MedusaContainer,
  _config: ConfigModule
): Promise<void> => {
  console.info("Starting loader...");

  console.info("Ending loader...");
};
