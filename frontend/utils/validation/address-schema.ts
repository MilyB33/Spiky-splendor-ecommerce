import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const addressSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  company: z.string().optional(),
  address1: z.string().min(1),
  address2: z.string().optional(),
  country: z.string().min(1),
  zipCode: z.string().min(1),
  city: z.string().min(1),
  phoneNumber: z.string().min(1),
});

export const addressTypedSchema = toTypedSchema(addressSchema);
export type AddressSchemaValues = z.infer<typeof addressSchema>;

export const extendedShippingAddressSchema = addressSchema.extend({
  addressName: z.string().min(1),
});

export const extendedShippingAddressTypedSchema = toTypedSchema(extendedShippingAddressSchema);
export type ExtendedShippingAddressSchemaValues = z.infer<typeof extendedShippingAddressSchema>;
