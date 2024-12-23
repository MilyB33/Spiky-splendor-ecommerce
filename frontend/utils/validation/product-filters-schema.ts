import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const productFiltersSchema = z
  .object({
    categories: z.array(z.string()).optional(),
    plantForms: z.array(z.string()).optional(),
    plantPlacements: z.array(z.string()).optional(),
    plantWaterDemands: z.array(z.string()).optional(),
    minPrice: z.coerce
      .number()
      .min(0, { message: "Minimum price cannot be negative" })
      .max(100000, { message: "Minimum price cannot be greater than 100,000" }),
    maxPrice: z.coerce
      .number()
      .min(0, { message: "Maximum price cannot be negative" })
      .max(100000, { message: "Maximum price cannot be greater than 100,000" }),
  })
  .superRefine((data, ctx) => {
    if (data.maxPrice < data.minPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Maximum price must be greater than the minimum price",
        path: ["maxPrice"],
      });
    }

    if (data.minPrice > data.maxPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Minimum price must be less than the maximum price",
        path: ["minPrice"],
      });
    }
  });

export const productFiltersTypedSchema = toTypedSchema(productFiltersSchema);
export type ProductFiltersSchemaValues = z.infer<typeof productFiltersSchema>;
