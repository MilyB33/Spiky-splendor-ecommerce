import { AdminPostProductsProductReq as MedusaAdminPostProductsProductReq } from "@medusajs/medusa/dist/api/routes/admin/products/update-product";
import { registerOverriddenValidators } from "@medusajs/medusa";

import {
  IsOptional,
  IsArray,
  IsString,
  IsNumber,
  IsEnum,
} from "class-validator";
import { Transform } from "class-transformer";
import { WaterDemand, PlantPlacement } from "../types/product";

export class AdminPostProductsProductReq extends MedusaAdminPostProductsProductReq {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  plant_forms?: string[];
  @IsOptional()
  @IsArray()
  @IsEnum(PlantPlacement, { each: true })
  plant_placements?: PlantPlacement[];
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  min_height: number;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  max_height: number;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pot_diameter: number;
  @IsOptional()
  @IsEnum(WaterDemand)
  water_demand: WaterDemand;
}

registerOverriddenValidators(AdminPostProductsProductReq);
