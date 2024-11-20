import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantPlacementService from "src/services/plant-placement";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const name = req.body.name;

  const plantPlacementService: PlantPlacementService = req.scope.resolve(
    "plantPlacementService"
  );

  const plantPlacement = await plantPlacementService.add(name);

  res.json(plantPlacement);
};
