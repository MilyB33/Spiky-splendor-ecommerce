import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PlantWaterDemandService from "../../../services/plant-water-demand";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const plantWaterDemandService: PlantWaterDemandService = req.scope.resolve(
    "plantWaterDemandService"
  );

  const plantWaterDemands = await plantWaterDemandService.list();

  res.json({ plant_water_demands: plantWaterDemands });
};
