import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const returnSchema = z
  .object({
    shippingMethod: z.object({ methodId: z.string(), price: z.number() }),
    items: z.array(
      z.object({
        id: z.string(),
        quantity: z.number(),
        isSelected: z.boolean(),
      }),
    ),
  })
  .refine(
    (items) =>
      items.items.some((item) => {
        console.log(item);
        return item.isSelected;
      }),
    {
      message: "At least one product must be selected",
      path: ["items"],
    },
  );

export const returnTypedSchema = toTypedSchema(returnSchema);
export type ReturnSchemaValues = z.infer<typeof returnSchema>;
