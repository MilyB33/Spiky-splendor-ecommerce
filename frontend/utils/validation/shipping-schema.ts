import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const shippingSchema = z.object({
  shippingCustomerType: z.union([z.literal("individual"), z.literal("company")]),
  // https://stackoverflow.com/questions/73582246/zod-schema-how-to-make-a-field-optional-or-have-a-minimum-string-contraint
  shippingName: z.string().min(5).optional().or(z.literal("")),
  shippingSurname: z.string().min(5).optional().or(z.literal("")),
  shippingCompany: z.string().min(5).optional().or(z.literal("")),
  shippingEmail: z.string().min(5).email().min(4),
  shippingAddress1: z.string().min(5),
  shippingAddress2: z.string().min(5).optional().or(z.literal("")),
  shippingCountry: z.string().min(1),
  shippingZipCode: z.string().min(5),
  shippingCity: z.string().min(5),
  shippingState: z.string().min(5),
  shippingPhoneNumber: z
    .string()
    .min(9, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must only contain digits"),
});

const billingDetailsSchema = z.object({
  sameBillingAddress: z.boolean().optional(),
  billingCustomerType: z.union([z.literal("individual"), z.literal("company")]).optional(),
  billingName: z.string().min(5).optional().or(z.literal("")),
  billingSurname: z.string().min(5).optional().or(z.literal("")),
  billingCompany: z.string().min(5).optional().or(z.literal("")),
  billingEmail: z.string().email().min(4).optional(),
  billingAddress1: z.string().min(5).optional(),
  billingAddress2: z.string().min(5).optional().or(z.literal("")),
  billingCountry: z.string().min(1).optional(),
  billingZipCode: z.string().min(5).optional(),
  billingCity: z.string().min(5).optional(),
  billingState: z.string().min(5).optional(),
  billingPhoneNumber: z
    .string()
    .min(9, "Phone number must be at least 9 digits")
    .regex(/^\d+$/, "Phone number must only contain digits")
    .optional(),
});

const shippingMethodsSchema = z.object({
  shippingMethod: z.object({ methodId: z.string(), price: z.number() }),
});

export const checkoutSchema = shippingSchema
  .merge(billingDetailsSchema)
  .merge(shippingMethodsSchema)
  .superRefine((data, ctx) => {
    // If the customer type is 'individual', check for shippingName and shippingSurname
    if (data.shippingCustomerType === "individual") {
      if (!data.shippingName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping name is required",
          path: ["shippingName"], // Point to the correct field
        });
      }

      if (!data.shippingSurname) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping surname is required",
          path: ["shippingSurname"], // Point to the correct field
        });
      }
    }

    // If the customer type is 'company', check for shippingCompany
    if (data.shippingCustomerType === "company") {
      if (!data.shippingCompany) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping company is required",
          path: ["shippingCompany"], // Point to the correct field
        });
      }
    }

    // If sameBillingAddress is true, we allow all fields to be optional
    if (!data.sameBillingAddress) {
      // Add an error for each field that should be required if sameBillingAddress is false
      if (!data.billingCustomerType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing customer type is required",
          path: ["billingCustomerType"],
        });
      }
      if (!data.billingName && data.billingCustomerType === "individual") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing name is required",
          path: ["billingName"],
        });
      }
      if (!data.billingSurname && data.billingCustomerType === "individual") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing surname is required for individuals",
          path: ["billingSurname"],
        });
      }
      if (data.billingCustomerType === "company" && !data.billingCompany) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing company is required for companies",
          path: ["billingCompany"],
        });
      }
      if (!data.billingEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing email is required",
          path: ["billingEmail"],
        });
      }
      if (!data.billingAddress1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing address is required",
          path: ["billingAddress1"],
        });
      }
      if (!data.billingCountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing country is required",
          path: ["billingCountry"],
        });
      }
      if (!data.billingZipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing zip code is required",
          path: ["billingZipCode"],
        });
      }
      if (!data.billingCity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing city is required",
          path: ["billingCity"],
        });
      }
      if (!data.billingState) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing state is required",
          path: ["billingState"],
        });
      }
      if (!data.billingPhoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing phone number is required",
          path: ["billingPhoneNumber"],
        });
      }
    }
  });

export const checkoutTypedSchema = toTypedSchema(checkoutSchema);
export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
