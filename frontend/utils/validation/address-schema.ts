import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(5, "First name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  surname: z
    .string()
    .min(5, "Last name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .min(5, "Company name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  address1: z.string().min(5, "Address must be at least 5 characters long.").optional(),
  address2: z
    .string()
    .min(5, "Address must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  country: z.string().min(1, "Country is required.").optional(),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters long.").optional(),
  city: z.string().min(5).optional(),
  phoneNumber: z
    .string()
    .min(9, "Phone number must be at least 9 characters long.")
    .regex(/^\d+$/, "Phone number can only contain numbers.")
    .optional(),
});

export const addressTypedSchema = toTypedSchema(addressSchema);
export type AddressSchemaValues = z.infer<typeof addressSchema>;

export const extendedShippingAddressSchema = addressSchema.extend({
  addressName: z.string().min(1),
});

export const extendedShippingAddressTypedSchema = toTypedSchema(extendedShippingAddressSchema);
export type ExtendedShippingAddressSchemaValues = z.infer<typeof extendedShippingAddressSchema>;
