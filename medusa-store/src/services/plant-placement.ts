import { TransactionBaseService } from "@medusajs/medusa";
import { PlantPlacement } from "src/models/plant-placement";
import { PlantPlacementRepository } from "src/repositories/plant-placement";
import { DeleteResult, EntityManager, In, Repository } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  plantPlacementRepository: typeof PlantPlacementRepository;
};

type ListConfig = {
  ids?: string[];
};

class PlantPlacementService extends TransactionBaseService {
  protected readonly plantPlacementRepository_: typeof PlantPlacementRepository;

  constructor({ plantPlacementRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.plantPlacementRepository_ = plantPlacementRepository;
  }

  async list(config?: ListConfig): Promise<PlantPlacement[]> {
    if (config?.ids?.length) {
      return this.plantPlacementRepository_.find({
        where: { id: In(config.ids) },
      });
    }

    return this.plantPlacementRepository_.find();
  }

  async delete(id: string): Promise<DeleteResult> {
    const removedPlantPlacement = await this.plantPlacementRepository_.delete({
      id,
    });

    return removedPlantPlacement;
  }

  async add(name: string): Promise<PlantPlacement> {
    const newPlantPlacement = this.plantPlacementRepository_.create({ name });
    const plantPlacementResult = await this.plantPlacementRepository_.save(
      newPlantPlacement
    );

    return plantPlacementResult;
  }
}

export default PlantPlacementService;
