import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantPlacementService from "../../../services/plant-placement";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const plantPlacementService: PlantPlacementService = req.scope.resolve(
    "plantPlacementService"
  );

  const plantPlacements = await plantPlacementService.list();

  res.json(plantPlacements);
};
