import { TransactionBaseService } from "@medusajs/medusa";
import { PlantPlacement } from "src/models/plant-placement";
import { PlantPlacementRepository } from "src/repositories/plant-placement";
import { EntityManager, Repository } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  plantPlacementRepository: typeof PlantPlacementRepository;
};

class PlantPlacementService extends TransactionBaseService {
  protected readonly plantPlacementRepository: typeof PlantPlacementRepository;

  constructor({ plantPlacementRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.plantPlacementRepository = plantPlacementRepository;
  }

  async list(): Promise<PlantPlacement[]> {
    const plantPlacements = await this.plantPlacementRepository.find();

    return plantPlacements;
  }
}

export default PlantPlacementService;
