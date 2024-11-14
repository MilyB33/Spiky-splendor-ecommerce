import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const personalDetailsSchema = z.object({
  firstName: z.string({ required_error: "Wymagane" }),
  lastName: z.string({ required_error: "Wymagane" }),
  email: z.string({ required_error: "Wymagane" }),
  phone: z.string().optional(),
});

export const personalDetailsTypedSchema = toTypedSchema(personalDetailsSchema);
export type PersonalDetailsSchemaValues = z.infer<typeof personalDetailsSchema>;
