import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantPlacementService from "src/services/plant-placement";

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const idParam: string = req.params.id;

  const plantPlacementService: PlantPlacementService = req.scope.resolve(
    "plantPlacementService"
  );

  await plantPlacementService.delete(idParam);

  res.json("Deleted successfully");
};
