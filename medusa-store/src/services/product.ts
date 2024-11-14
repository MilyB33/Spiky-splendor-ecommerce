import {
  buildQuery,
  ExtendedFindConfig,
  ProductService as MedusaProductService,
  Product,
} from "@medusajs/medusa";
import {
  ProductSelector,
  FindProductConfig,
  ProductFilterOptions,
} from "@medusajs/medusa/dist/types/product";
import ProductRepository from "src/repositories/product";
import { FindOptionsWhere, In, Raw } from "typeorm";

type InjectedDependencies = {
  productRepository: typeof ProductRepository;
};

type ProductSelectorExtended = ProductSelector & {
  plant_forms_ids?: string[];
  plant_placements_ids?: string[];
  plant_water_demand_ids?: string[];
  categories_ids?: string[];
  min_price?: number;
  max_price?: number;
};

class ProductService extends MedusaProductService {
  protected productRepository_: typeof ProductRepository;

  constructor({ productRepository }: InjectedDependencies) {
    super(arguments[0]);

    this.productRepository_ = productRepository;
  }

  async list(
    selector: ProductSelector,
    config?: FindProductConfig
  ): Promise<Product[]> {
    return super.list(selector, config);
  }

  async listAndCount(
    selector: ProductSelectorExtended,
    config?: FindProductConfig
  ): Promise<[Product[], number]> {
    const productRepo = this.activeManager_.withRepository(
      this.productRepository_
    );

    const {
      q,
      plant_forms_ids,
      plant_placements_ids,
      plant_water_demand_ids,
      categories_ids,
      min_price,
      max_price,
      ...productSelector
    } = selector;

    const query = buildQuery(productSelector, config) as ExtendedFindConfig<
      Product & ProductFilterOptions
    >;

    // Needs to remove this from query
    delete query.select.sales_channel_id;
    // @ts-ignore
    delete query.where.sales_channel_id;

    // Additional filters
    const filtersQuery = this.prepareFilters_({
      plant_forms_ids,
      plant_placements_ids,
      plant_water_demand_ids,
      min_price,
      max_price,
      categories_ids,
    });

    const result = await productRepo.findAndCount({
      ...query,
      relationLoadStrategy: "query", // TO have all fields "join" only returns applied
      where: { ...query.where, ...filtersQuery },
    });

    return result;
  }

  prepareFilters_(selector: ProductSelectorExtended) {
    let filtersQuery: FindOptionsWhere<Product> | FindOptionsWhere<Product>[] =
      {};

    if (selector.categories_ids) {
      filtersQuery.categories = { id: In(selector.categories_ids) };
    }

    if (selector.plant_forms_ids) {
      filtersQuery.plant_forms = { id: In(selector.plant_forms_ids) };
    }

    if (selector.plant_placements_ids) {
      filtersQuery.plant_placements = { id: In(selector.plant_placements_ids) };
    }

    if (selector.plant_water_demand_ids) {
      filtersQuery.plant_water_demand = {
        id: In(selector.plant_water_demand_ids),
      };
    }

    if (selector.min_price || selector.max_price) {
      const min = selector.min_price || 0;
      const max = selector.max_price || 100000;

      filtersQuery.variants = {
        prices: {
          currency_code: "pln", // TODO: this is not needed if switch to only one region with one currency (product can have one price rather than more)
          amount: Raw(
            (alias) => `${alias} * 1.23 between ${min * 100} and ${max * 100}`
          ),
        },
      };
    }

    return filtersQuery;
  }
}

export default ProductService;
