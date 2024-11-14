import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const productFiltersSchema = z
  .object({
    categories: z.array(z.string()).optional(),
    plantForms: z.array(z.string()).optional(),
    plantPlacements: z.array(z.string()).optional(),
    plantWaterDemands: z.array(z.string()).optional(),
    minPrice: z.coerce
      .number({ required_error: "Wymagane" })
      .min(0, { message: "Cena minimalna nie może być ujemna" })
      .max(100000, { message: "Cena minimalna nie może być większa niż 100000" }),
    maxPrice: z.coerce
      .number({ required_error: "Wymagane" })
      .min(0, { message: "Cena maksymalna nie może być ujemna" })
      .max(100000, { message: "Cena maksymalna nie może być większa niż 100000" }),
  })
  .superRefine((data, ctx) => {
    if (data.maxPrice < data.minPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cena maksymalna musi być większa niż cena minimalna",
        path: ["maxPrice"],
      });
    }

    if (data.minPrice > data.maxPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cena minimalna musi być mniejsza niż cena maksymalna",
        path: ["minPrice"],
      });
    }
  });

export const productFiltersTypedSchema = toTypedSchema(productFiltersSchema);
export type ProductFiltersSchemaValues = z.infer<typeof productFiltersSchema>;
