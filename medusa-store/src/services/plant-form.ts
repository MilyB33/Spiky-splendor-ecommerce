import { TransactionBaseService } from "@medusajs/medusa";
import { PlantForm } from "src/models/plant-form";
import { PlantFormRepository } from "src/repositories/plant-form";
import { DeleteResult, EntityManager, In } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  plantFormRepository: typeof PlantFormRepository;
};

type ListConfig = {
  ids?: string[];
};

class PlantFormService extends TransactionBaseService {
  protected readonly plantFormRepository_: typeof PlantFormRepository;

  constructor({ plantFormRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.plantFormRepository_ = plantFormRepository;
  }

  async list(config?: ListConfig): Promise<PlantForm[]> {
    if (config?.ids?.length) {
      return this.plantFormRepository_.find({
        where: { id: In(config.ids) },
      });
    }

    return this.plantFormRepository_.find();
  }

  async delete(id: string): Promise<DeleteResult> {
    const removedPlantForm = await this.plantFormRepository_.delete({ id });

    return removedPlantForm;
  }

  async add(name: string): Promise<PlantForm> {
    const newPlantForms = this.plantFormRepository_.create({ name });
    const plantFormResult = await this.plantFormRepository_.save(newPlantForms);

    return plantFormResult;
  }
}

export default PlantFormService;
