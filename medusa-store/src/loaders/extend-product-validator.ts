//@ts-nocheck
import { StoreGetProductsParams as MedusaStoreGetProductsParams } from "@medusajs/medusa/dist/api/routes/store/products/list-products";

import {
  ValidateNested,
  IsObject,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
  Max,
  Min,
  IsEnum,
} from "class-validator";
import { registerOverriddenValidators } from "@medusajs/medusa";
import { Type, Transform } from "class-transformer";
import { MAX_PRICE_FILTER_VALUE, MIN_PRICE_FILTER_VALUE } from "src/constant";
import { PlantPlacement, WaterDemand, PlantForm } from "../types/product";

export class StoreGetProductsParams extends MedusaStoreGetProductsParams {
  @IsOptional()
  @IsArray()
  @IsEnum(PlantForm, { each: true })
  plant_forms?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories_ids?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(PlantPlacement, { each: true })
  plant_placements?: PlantPlacement[];

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  min_price?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  max_price?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  is_search?: boolean;

  @IsString()
  region: string;

  @IsOptional()
  @IsArray()
  @IsEnum(WaterDemand, { each: true })
  water_demand: WaterDemand[];
}

registerOverriddenValidators(StoreGetProductsParams);
