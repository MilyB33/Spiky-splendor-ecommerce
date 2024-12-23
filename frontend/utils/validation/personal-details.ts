import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const personalDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});

export const personalDetailsTypedSchema = toTypedSchema(personalDetailsSchema);
export type PersonalDetailsSchemaValues = z.infer<typeof personalDetailsSchema>;
