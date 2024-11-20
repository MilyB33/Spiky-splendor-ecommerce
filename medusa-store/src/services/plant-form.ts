import { TransactionBaseService } from "@medusajs/medusa";
import { PlantForm } from "src/models/plant-form";
import { PlantFormRepository } from "src/repositories/plant-form";
import { DeleteResult, EntityManager } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  plantFormRepository: typeof PlantFormRepository;
};

class PlantFormService extends TransactionBaseService {
  protected readonly plantFormRepository: typeof PlantFormRepository;

  constructor({ plantFormRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.plantFormRepository = plantFormRepository;
  }

  async list(): Promise<PlantForm[]> {
    const plantForms = await this.plantFormRepository.find();

    return plantForms;
  }

  async delete(id: string): Promise<DeleteResult> {
    const removedPlantForm = await this.plantFormRepository.delete({ id });

    return removedPlantForm;
  }

  async add(name: string): Promise<PlantForm> {
    const newPlantForms = this.plantFormRepository.create({ name });
    const plantFormResult = await this.plantFormRepository.save(newPlantForms);

    return plantFormResult;
  }
}

export default PlantFormService;
