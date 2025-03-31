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
  UpdateProductInput,
} from "@medusajs/medusa/dist/types/product";
import ProductRepository from "src/repositories/product";
import { FindOneOptions, FindOptionsWhere, In, Raw, Any } from "typeorm";
import PlantFormService from "./plant-form";
import { PlantPlacement, WaterDemand } from "../types/product";

type InjectedDependencies = {
  productRepository: typeof ProductRepository;
  plantFormService: PlantFormService;
  regionService: RegionService;
};

type ProductSelectorExtended = ProductSelector & {
  plant_forms_ids?: string[];
  plant_placements?: PlantPlacement[];
  water_demand?: WaterDemand[];
  categories_ids?: string[];
  min_price?: number;
  max_price?: number;
  is_search?: boolean;
  region?: string; // region_id is removed on api/endpoint level and we don't get it here
};

type UpdateProductInputExtended = UpdateProductInput & {
  plant_forms?: string[];
  plant_placements?: string[];
  water_demand?: WaterDemand;
  min_price?: number;
  max_price?: number;
};

type PrepareFiltersConfig = {
  tax_rate: number;
  currency_code: string;
};

class ProductService extends MedusaProductService {
  protected productRepository_: typeof ProductRepository;
  protected plantFormService_: PlantFormService;
  protected regionService_: RegionService;

  constructor({
    productRepository,
    plantFormService,
    regionService,
  }: InjectedDependencies) {
    super(arguments[0]);

    this.productRepository_ = productRepository;
    this.plantFormService_ = plantFormService;
    this.regionService_ = regionService;
  }

  async update(productId: string, update: UpdateProductInputExtended) {
    const { plant_forms, ...restUpdate } = update;

    const plantForms = await this.plantFormService_.list({ ids: plant_forms });

    return super.update(productId, {
      ...restUpdate,
      // @ts-expect-error can't update module
      plant_forms: plantForms,
    });
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
      plant_forms_ids,
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

    // Needs to remove this from query
    delete query.select.sales_channel_id;
    // @ts-ignore
    delete query.where.sales_channel_id;

    // Additional filters
    const filtersQuery = this.prepareFilters_(
      {
        plant_forms_ids,
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
      relationLoadStrategy: "join", // It cuts the values that are not applied by filter e.g only returns plant_form which is applied in form
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

    if (selector.plant_forms_ids) {
      filtersQuery.plant_forms = { id: In(selector.plant_forms_ids) };
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
