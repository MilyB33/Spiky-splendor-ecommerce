import { TransactionBaseService } from "@medusajs/medusa";
import { PlantForm } from "src/models/plant-form";
import { PlantPlacement } from "src/models/plant-placement";
import { PlantPlacementRepository } from "src/repositories/plant-placement";
import { DeleteResult, EntityManager, Repository } from "typeorm";

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

  async delete(id: string): Promise<DeleteResult> {
    const removedPlantPlacement = await this.plantPlacementRepository.delete({
      id,
    });

    return removedPlantPlacement;
  }

  async add(name: string): Promise<PlantPlacement> {
    const newPlantPlacement = this.plantPlacementRepository.create({ name });
    const plantPlacementResult = await this.plantPlacementRepository.save(
      newPlantPlacement
    );

    return plantPlacementResult;
  }
}

export default PlantPlacementService;
