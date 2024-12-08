import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const shippingSchema = z.object({
  shippingCustomerType: z.union([z.literal("individual"), z.literal("company")], {
    required_error: "Wymagane pole: wybierz rodzaj klienta (indywidualny lub firma).",
  }),
  shippingName: z
    .string()
    .min(5, "Imię musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  shippingSurname: z
    .string()
    .min(5, "Nazwisko musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  shippingCompany: z
    .string()
    .min(5, "Nazwa firmy musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  shippingEmail: z
    .string()
    .min(5, "Email musi mieć co najmniej 5 znaków.")
    .email("Podaj poprawny adres email."),
  shippingAddress1: z.string().min(5, "Adres musi mieć co najmniej 5 znaków."),
  shippingAddress2: z
    .string()
    .min(5, "Adres dodatkowy musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  shippingCountry: z.string().min(1, "Kraj jest wymagany."),
  shippingZipCode: z.string().min(5, "Kod pocztowy musi mieć co najmniej 5 znaków."),
  shippingCity: z.string().min(5, "Miasto musi mieć co najmniej 5 znaków."),
  shippingPhoneNumber: z
    .string()
    .min(9, "Numer telefonu musi mieć co najmniej 9 cyfr.")
    .regex(/^\d+$/, "Numer telefonu może zawierać tylko cyfry."),
});

const billingDetailsSchema = z.object({
  sameBillingAddress: z.boolean().optional(), // Pole opcjonalne, brak walidacji tekstowej.
  billingCustomerType: z
    .union([z.literal("individual"), z.literal("company")])
    .optional()
    .or(z.literal("")),
  billingName: z
    .string()
    .min(5, "Imię musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  billingSurname: z
    .string()
    .min(5, "Nazwisko musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  billingCompany: z
    .string()
    .min(5, "Nazwa firmy musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  billingEmail: z
    .string()
    .email("Podaj poprawny adres email.")
    .min(4, "Email musi mieć co najmniej 4 znaki.")
    .optional(),
  billingAddress1: z.string().min(5, "Adres musi mieć co najmniej 5 znaków.").optional(),
  billingAddress2: z
    .string()
    .min(5, "Adres dodatkowy musi mieć co najmniej 5 znaków.")
    .optional()
    .or(z.literal("")),
  billingCountry: z.string().min(1, "Kraj jest wymagany.").optional(),
  billingZipCode: z.string().min(5, "Kod pocztowy musi mieć co najmniej 5 znaków.").optional(),
  billingCity: z.string().min(5, "Miasto musi mieć co najmniej 5 znaków.").optional(),
  billingPhoneNumber: z
    .string()
    .min(9, "Numer telefonu musi mieć co najmniej 9 cyfr.")
    .regex(/^\d+$/, "Numer telefonu może zawierać tylko cyfry.")
    .optional(),
});

const shippingMethodsSchema = z.object({
  shippingMethod: z.object(
    { methodId: z.string(), price: z.number() },
    { required_error: "Metoda wysyłki jest wymagana!" },
  ),
});

export const checkoutSchema = shippingSchema
  .merge(billingDetailsSchema)
  .merge(shippingMethodsSchema)
  .superRefine((data, ctx) => {
    if (data.shippingCustomerType === "individual") {
      if (!data.shippingName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Imię do wysyłki jest wymagane.",
          path: ["shippingName"],
        });
      }

      if (!data.shippingSurname) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nazwisko do wysyłki jest wymagane.",
          path: ["shippingSurname"],
        });
      }
    }

    if (data.shippingCustomerType === "company") {
      if (!data.shippingCompany) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nazwa firmy do wysyłki jest wymagana.",
          path: ["shippingCompany"],
        });
      }
    }

    if (!data.sameBillingAddress) {
      if (!data.billingCustomerType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Typ klienta dla faktury jest wymagany.",
          path: ["billingCustomerType"],
        });
      }
      if (!data.billingName && data.billingCustomerType === "individual") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Imię na fakturze jest wymagane.",
          path: ["billingName"],
        });
      }
      if (!data.billingSurname && data.billingCustomerType === "individual") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nazwisko na fakturze jest wymagane dla osób indywidualnych.",
          path: ["billingSurname"],
        });
      }
      if (data.billingCustomerType === "company" && !data.billingCompany) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nazwa firmy na fakturze jest wymagana dla firm.",
          path: ["billingCompany"],
        });
      }
      if (!data.billingEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email do faktury jest wymagany.",
          path: ["billingEmail"],
        });
      }
      if (!data.billingAddress1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Adres do faktury jest wymagany.",
          path: ["billingAddress1"],
        });
      }
      if (!data.billingCountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Kraj na fakturze jest wymagany.",
          path: ["billingCountry"],
        });
      }
      if (!data.billingZipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Kod pocztowy na fakturze jest wymagany.",
          path: ["billingZipCode"],
        });
      }
      if (!data.billingCity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Miasto na fakturze jest wymagane.",
          path: ["billingCity"],
        });
      }
      if (!data.billingPhoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Numer telefonu do faktury jest wymagany.",
          path: ["billingPhoneNumber"],
        });
      }
    }
  });

export const checkoutTypedSchema = toTypedSchema(checkoutSchema);
export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
