import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantWaterDemandService from "src/services/plant-water-demand";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const name = req.body.name;

  const plantWaterDemandService: PlantWaterDemandService = req.scope.resolve(
    "plantWaterDemandService"
  );

  const plantWaterDemand = await plantWaterDemandService.add(name);

  res.json(plantWaterDemand);
};
