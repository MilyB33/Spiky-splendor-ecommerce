import type { StorePostCustomersReq } from "@medusajs/medusa";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const signUpSchema: z.ZodType<StorePostCustomersReq> = z
  .object({
    password: z.string().min(8, "Too short"),
    email: z.string().email({ message: "Must be a valid email" }),
    first_name: z.string(),
    last_name: z.string(),
  })
  .required();

export const signUpTypedSchema = toTypedSchema(signUpSchema);
