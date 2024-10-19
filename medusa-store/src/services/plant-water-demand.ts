import { PlantWaterDemand } from "../models/plant-water-demand";
import { PlantWaterDemandRepository } from "../repositories/plant-water-demand";
import { EntityManager } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  plantWaterDemandRepository: typeof PlantWaterDemandRepository;
};

class PlantWaterDemandService {
  protected readonly plantWaterDemandRepository: typeof PlantWaterDemandRepository;

  constructor({ plantWaterDemandRepository }: InjectedDependencies) {
    this.plantWaterDemandRepository = plantWaterDemandRepository;
  }

  async list(): Promise<PlantWaterDemand[]> {
    const plantWaterDemands = await this.plantWaterDemandRepository.find();

    return plantWaterDemands;
  }
}

export default PlantWaterDemandService;
