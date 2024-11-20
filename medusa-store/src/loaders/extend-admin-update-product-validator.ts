import { AdminPostProductsProductReq as MedusaAdminPostProductsProductReq } from "@medusajs/medusa/dist/api/routes/admin/products/update-product";
import { registerOverriddenValidators } from "@medusajs/medusa";

import { IsOptional, IsArray } from "class-validator";
import { Type } from "class-transformer";

export class AdminPostProductsProductReq extends MedusaAdminPostProductsProductReq {
  @IsOptional()
  @IsArray()
  @Type(() => String)
  plant_forms?: string[];
  @IsOptional()
  @IsArray()
  @Type(() => String)
  plant_placements?: string[];
  @IsOptional()
  @Type(() => String)
  plant_water_demand_id?: string;
  @IsOptional()
  @Type(() => Number)
  min_height: number;
  @IsOptional()
  @Type(() => Number)
  max_height: number;
  @IsOptional()
  @Type(() => Number)
  pot_diameter: number;
}

registerOverriddenValidators(AdminPostProductsProductReq);
