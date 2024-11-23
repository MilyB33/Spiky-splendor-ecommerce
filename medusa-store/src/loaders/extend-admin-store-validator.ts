//@ts-nocheck
import { AdminPostStoreReq as MedusaAdminPostStoreReq } from "@medusajs/medusa/dist/api/routes/admin/store/update-store";

import { IsString, IsOptional } from "class-validator";
import { registerOverriddenValidators } from "@medusajs/medusa";
import { Type } from "class-transformer";

export class AdminPostStoreReq extends MedusaAdminPostStoreReq {
  @IsOptional()
  @Type(() => String)
  company?: string;

  @IsOptional()
  @Type(() => String())
  city?: string;

  @IsOptional()
  @Type(() => String())
  postal_code?: string;

  @IsOptional()
  @Type(() => String())
  address?: string;
}

registerOverriddenValidators(AdminPostStoreReq);
