import { PlantWaterDemand } from "../models/plant-water-demand";
import { PlantWaterDemandRepository } from "../repositories/plant-water-demand";
import { DeleteResult, EntityManager } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  plantWaterDemandRepository: typeof PlantWaterDemandRepository;
};

class PlantWaterDemandService {
  protected readonly plantWaterDemandRepository_: typeof PlantWaterDemandRepository;

  constructor({ plantWaterDemandRepository }: InjectedDependencies) {
    this.plantWaterDemandRepository_ = plantWaterDemandRepository;
  }

  async list(): Promise<PlantWaterDemand[]> {
    const plantWaterDemands = await this.plantWaterDemandRepository_.find();

    return plantWaterDemands;
  }

  async delete(id: string): Promise<DeleteResult> {
    const removedPlantWaterDemand =
      await this.plantWaterDemandRepository_.delete({
        id,
      });

    return removedPlantWaterDemand;
  }

  async add(name: string): Promise<PlantWaterDemand> {
    const newPlantWaterDemand = this.plantWaterDemandRepository_.create({
      name,
    });
    const plantWaterDemandResult = await this.plantWaterDemandRepository_.save(
      newPlantWaterDemand
    );

    return plantWaterDemandResult;
  }
}

export default PlantWaterDemandService;
