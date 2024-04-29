import type { StorePostAuthReq } from "@medusajs/medusa";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const signInSchema: z.ZodType<StorePostAuthReq> = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string().min(8, "Too short"),
});

export const signInTypedSchema = toTypedSchema(signInSchema);
