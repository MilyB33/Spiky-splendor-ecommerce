import { AdminPostProductsProductReq as MedusaAdminPostProductsProductReq } from "@medusajs/medusa/dist/api/routes/admin/products/update-product";
import { registerOverriddenValidators } from "@medusajs/medusa";

import { IsOptional, IsArray, IsString, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class AdminPostProductsProductReq extends MedusaAdminPostProductsProductReq {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  plant_forms?: string[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  plant_placements?: string[];
  @IsOptional()
  @IsString({ each: true })
  plant_water_demand_id?: string;
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
}

registerOverriddenValidators(AdminPostProductsProductReq);
