import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantFormsService from "src/services/plant-form";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const name = req.body.name;

  const plantFormService: PlantFormsService =
    req.scope.resolve("plantFormService");

  const plantForm = await plantFormService.add(name);

  res.json(plantForm);
};
