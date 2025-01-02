//@ts-nocheck
import { AdminPostStoreReq as MedusaAdminPostStoreReq } from "@medusajs/medusa/dist/api/routes/admin/store/update-store";

import { IsString, IsOptional } from "class-validator";
import { registerOverriddenValidators } from "@medusajs/medusa";
import { Type } from "class-transformer";

export class AdminPostStoreReq extends MedusaAdminPostStoreReq {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

registerOverriddenValidators(AdminPostStoreReq);
