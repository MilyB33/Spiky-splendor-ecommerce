import {
  FindConfig,
  ReturnService as MedusaReturnService,
  Return,
} from "@medusajs/medusa";
import ReturnRepository from "@medusajs/medusa/dist/repositories/return";

type InjectedDependencies = {
  returnRepository: typeof ReturnRepository;
};

class ReturnService extends MedusaReturnService {
  protected returnRepository_: typeof ReturnRepository;

  constructor({ returnRepository }: InjectedDependencies) {
    super(arguments[0]);

    this.returnRepository_ = returnRepository;
  }

  async customerReturns(customerId: string, config: FindConfig<Return>) {
    return await this.atomicPhase_(async () => {
      const [customerReturns, count] =
        await this.returnRepository_.findAndCount({
          take: config.take,
          skip: config.skip,
          where: {
            order: {
              customer_id: customerId,
            },
          },
          relations: ["order", "items.item"],
          select: {
            order: {
              display_id: true,
            },
            items: {
              item: {
                title: true,
                quantity: true,
              },
            },
          },
        });

      return { returns: customerReturns, count };
    });
  }
}

export default ReturnService;
