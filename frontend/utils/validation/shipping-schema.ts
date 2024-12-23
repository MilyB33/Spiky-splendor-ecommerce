import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const shippingSchema = z.object({
  shippingCustomerType: z.union([z.literal("individual"), z.literal("company")], {
    required_error: "Required field: select customer type (individual or company).",
  }),
  shippingName: z
    .string()
    .min(5, "First name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  shippingSurname: z
    .string()
    .min(5, "Last name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  shippingCompany: z
    .string()
    .min(5, "Company name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  shippingEmail: z.string().min(5, "Email must be at least 5 characters long.").email(),
  shippingAddress1: z.string().min(5, "Address must be at least 5 characters long."),
  shippingAddress2: z
    .string()
    .min(5, "Address must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  shippingCountry: z.string().min(1, "Country is required."),
  shippingZipCode: z.string().min(5, "Zip code must be at least 5 characters long."),
  shippingCity: z.string().min(5),
  shippingPhoneNumber: z
    .string()
    .min(9, "Phone number must be at least 9 characters long.")
    .regex(/^\d+$/, "Phone number can only contain numbers."),
});

const billingDetailsSchema = z.object({
  sameBillingAddress: z.boolean().optional(),
  billingCustomerType: z
    .union([z.literal("individual"), z.literal("company")])
    .optional()
    .or(z.literal("")),
  billingName: z
    .string()
    .min(5, "First name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  billingSurname: z
    .string()
    .min(5, "Last name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  billingCompany: z
    .string()
    .min(5, "Company name must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  billingEmail: z.string().email().min(4, "Email must be at least 5 characters long.").optional(),
  billingAddress1: z.string().min(5, "Address must be at least 5 characters long.").optional(),
  billingAddress2: z
    .string()
    .min(5, "Address must be at least 5 characters long.")
    .optional()
    .or(z.literal("")),
  billingCountry: z.string().min(1, "Country is required.").optional(),
  billingZipCode: z.string().min(5, "Zip code must be at least 5 characters long.").optional(),
  billingCity: z.string().min(5, "City must be at least 5 characters long.").optional(),
  billingPhoneNumber: z
    .string()
    .min(9, "Phone number must be at least 9 characters long.")
    .regex(/^\d+$/, "Phone number can only contain numbers.")
    .optional(),
});

const shippingMethodsSchema = z.object({
  shippingMethod: z.object({ methodId: z.string(), price: z.number() }),
});

export const checkoutSchema = shippingSchema
  .merge(billingDetailsSchema)
  .merge(shippingMethodsSchema)
  .superRefine((data, ctx) => {
    if (data.shippingCustomerType === "individual") {
      if (!data.shippingName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First name for shipping is required.",
          path: ["shippingName"],
        });
      }

      if (!data.shippingSurname) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last name for shipping is required.",
          path: ["shippingSurname"],
        });
      }
    }

    if (data.shippingCustomerType === "company") {
      if (!data.shippingCompany) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name for shipping is required.",
          path: ["shippingCompany"],
        });
      }
    }

    if (!data.sameBillingAddress) {
      if (!data.billingCustomerType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Customer type for billing is required.",
          path: ["billingCustomerType"],
        });
      }
      if (!data.billingName && data.billingCustomerType === "individual") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First name on the invoice is required.",
          path: ["billingName"],
        });
      }
      if (!data.billingSurname && data.billingCustomerType === "individual") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Surname on the invoice is required for individuals.",
          path: ["billingSurname"],
        });
      }
      if (data.billingCustomerType === "company" && !data.billingCompany) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name on the invoice is required for companies.",
          path: ["billingCompany"],
        });
      }
      if (!data.billingEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email for the invoice is required.",
          path: ["billingEmail"],
        });
      }
      if (!data.billingAddress1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address for the invoice is required.",
          path: ["billingAddress1"],
        });
      }
      if (!data.billingCountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Country on the invoice is required.",
          path: ["billingCountry"],
        });
      }
      if (!data.billingZipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Zip code on the invoice is required.",
          path: ["billingZipCode"],
        });
      }
      if (!data.billingCity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City on the invoice is required.",
          path: ["billingCity"],
        });
      }
      if (!data.billingPhoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number for the invoice is required.",
          path: ["billingPhoneNumber"],
        });
      }
    }
  });

export const checkoutTypedSchema = toTypedSchema(checkoutSchema);
export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
