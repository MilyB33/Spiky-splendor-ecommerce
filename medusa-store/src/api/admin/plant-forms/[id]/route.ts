import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantFormsService from "src/services/plant-form";

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const idParam: string = req.params.id;

  const plantFormService: PlantFormsService =
    req.scope.resolve("plantFormService");

  await plantFormService.delete(idParam);

  res.json("Deleted successfully");
};
