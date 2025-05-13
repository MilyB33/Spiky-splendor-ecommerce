import {
  buildQuery,
  ExtendedFindConfig,
  ProductService as MedusaProductService,
  RegionService,
  Product,
} from "@medusajs/medusa";
import {
  ProductSelector,
  FindProductConfig,
  ProductFilterOptions,
} from "@medusajs/medusa/dist/types/product";
import ProductRepository from "src/repositories/product";
import { FindOneOptions, FindOptionsWhere, In, Raw } from "typeorm";
import { PlantPlacement, WaterDemand, PlantForm } from "../types/product";

type InjectedDependencies = {
  productRepository: typeof ProductRepository;
  regionService: RegionService;
};

type ProductSelectorExtended = ProductSelector & {
  plant_forms?: PlantForm[];
  plant_placements?: PlantPlacement[];
  water_demand?: WaterDemand[];
  categories_ids?: string[];
  min_price?: number;
  max_price?: number;
  is_search?: boolean;
  region?: string;
};

type PrepareFiltersConfig = {
  tax_rate: number;
  currency_code: string;
};

class ProductService extends MedusaProductService {
  protected productRepository_: typeof ProductRepository;
  protected regionService_: RegionService;

  constructor({ productRepository, regionService }: InjectedDependencies) {
    super(arguments[0]);

    this.productRepository_ = productRepository;
    this.regionService_ = regionService;
  }

  async listAndCount(
    selector: ProductSelectorExtended,
    config?: FindProductConfig
  ): Promise<[Product[], number]> {
    const { is_search, region: region_id, ...restSelector } = selector;

    if (!is_search) {
      return super.listAndCount(restSelector, config);
    }

    const productRepo = this.activeManager_.withRepository(
      this.productRepository_
    );

    const {
      q,
      plant_forms,
      plant_placements,
      categories_ids,
      min_price,
      max_price,
      water_demand,
      ...productSelector
    } = restSelector;

    const region = await this.regionService_.retrieve(region_id);
    const { tax_rate, currency_code } = region;

    const query = buildQuery(productSelector, config) as ExtendedFindConfig<
      Product & ProductFilterOptions
    >;

    delete query.select.sales_channel_id;
    // @ts-ignore
    delete query.where.sales_channel_id;

    const filtersQuery = this.prepareFilters_(
      {
        plant_forms,
        plant_placements,
        water_demand,
        min_price,
        max_price,
        categories_ids,
      },
      { tax_rate, currency_code }
    );

    const order = this.prepareOrder_(config.order);

    const result = await productRepo.findAndCount({
      ...query,
      relationLoadStrategy: "join",
      where: {
        ...query.where,
        ...filtersQuery,
      },
      order,
    });

    return result;
  }

  prepareFilters_(
    selector: ProductSelectorExtended,
    config: PrepareFiltersConfig
  ) {
    let filtersQuery: FindOptionsWhere<Product> | FindOptionsWhere<Product>[] =
      {};

    if (selector.categories_ids) {
      filtersQuery.categories = { id: In(selector.categories_ids) };
    }

    if (selector.plant_forms) {
      filtersQuery.plant_forms = Raw(
        (alias) =>
          `${alias} && ARRAY[${selector.plant_forms
            .map((p) => `'${p}'`)
            .join(", ")}]::plant_forms_enum[]`
      );
    }

    if (selector.plant_placements) {
      filtersQuery.plant_placements = Raw(
        (alias) =>
          `${alias} && ARRAY[${selector.plant_placements
            .map((p) => `'${p}'`)
            .join(", ")}]::plant_placements_enum[]`
      );
    }

    if (selector.water_demand) {
      filtersQuery.water_demand = In(selector.water_demand);
    }

    if (selector.min_price || selector.max_price) {
      const min = selector.min_price || 0;
      const max = selector.max_price || 100000;
      const taxRate = config.tax_rate / 100 + 1;

      filtersQuery.variants = {
        prices: {
          currency_code: config.currency_code,
          amount: Raw(
            (alias) =>
              `${alias} * ${taxRate} between ${min * 100} and ${max * 100}`
          ),
        },
      };
    }

    return filtersQuery;
  }

  prepareOrder_(order_: { [key: string]: "ASC" | "DESC" }) {
    const order: FindOneOptions<Product>["order"] = {};

    const field = Object.keys(order_)[0];

    if (field === "variants.prices.amount") {
      order.variants = {
        prices: { amount: order_[field] },
      };
    }

    if (field === "title") {
      order.title = order_[field];
    }

    return order;
  }
}

export default ProductService;
