//@ts-nocheck
import { StoreGetProductsParams as MedusaStoreGetProductsParams } from "@medusajs/medusa/dist/api/routes/store/products/list-products";

import {
  ValidateNested,
  IsObject,
  IsString,
  IsOptional,
  IsArray,
  Max,
  Min,
} from "class-validator";
import { registerOverriddenValidators } from "@medusajs/medusa";
import { Type } from "class-transformer";
import { MAX_PRICE_FILTER_VALUE, MIN_PRICE_FILTER_VALUE } from "src/constant";

export class StoreGetProductsParams extends MedusaStoreGetProductsParams {
  @IsOptional()
  @IsArray()
  @Type(() => String)
  plant_forms_ids: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String())
  categories_ids: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String())
  plant_placements_ids: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String())
  plant_water_demand_ids: string[];

  @IsOptional()
  @Type(() => Number())
  min_price: number;

  @IsOptional()
  @Type(() => Number())
  max_price: number;

  @IsOptional()
  @Type(() => Boolean())
  is_search: boolean;
}

registerOverriddenValidators(StoreGetProductsParams);
