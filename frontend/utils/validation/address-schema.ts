import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const addressSchema = z.object({
  name: z.string({ required_error: "Wymagane" }),
  surname: z.string({ required_error: "Wymagane" }),
  company: z.string().optional(),
  address1: z.string({ required_error: "Wymagane" }),
  address2: z.string().optional(),
  country: z.string({ required_error: "Wymagane" }),
  zipCode: z.string({ required_error: "Wymagane" }),
  city: z.string({ required_error: "Wymagane" }),
  state: z.string({ required_error: "Wymagane" }),
  phoneNumber: z.string({ required_error: "Wymagane" }),
});

export const addressTypedSchema = toTypedSchema(addressSchema);
export type AddressSchemaValues = z.infer<typeof addressSchema>;
