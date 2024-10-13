import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantFormService from "../../../services/plant-form";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const plantFormService: PlantFormService =
    req.scope.resolve("plantFormService");

  const plantForms = await plantFormService.list();

  res.json(plantForms);
};
