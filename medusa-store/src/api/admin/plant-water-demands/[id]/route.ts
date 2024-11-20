import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantWaterDemandService from "src/services/plant-water-demand";

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const idParam: string = req.params.id;

  const plantWaterDemandService: PlantWaterDemandService = req.scope.resolve(
    "plantWaterDemandService"
  );

  await plantWaterDemandService.delete(idParam);

  res.json("Deleted successfully");
};
