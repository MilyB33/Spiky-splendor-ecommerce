import type { CartUpdateProps } from "@medusajs/medusa/dist/types/cart";
import type { CheckoutSchemaValues } from "../validation/shipping-schema";
import type { Address } from "@medusajs/medusa";

export const prepareCheckoutDataBeforePayment = (
  values: Omit<CheckoutSchemaValues, "shippingMethod">,
): CartUpdateProps => {
  const shippingAddress: CartUpdateProps["shipping_address"] = {
    first_name: values.shippingName,
    last_name: values.shippingSurname,
    company: values.shippingCompany,
    address_1: values.shippingAddress1,
    address_2: values.shippingAddress2,
    country_code: values.shippingCountry,
    postal_code: values.shippingZipCode,
    city: values.shippingCity,
    phone: values.shippingPhoneNumber,
  };

  const billingAddress: CartUpdateProps["billing_address"] = values.sameBillingAddress
    ? { ...shippingAddress }
    : {
        first_name: values.billingName,
        last_name: values.billingSurname,
        company: values.billingCompany,
        address_1: values.billingAddress1,
        address_2: values.billingAddress2,
        country_code: values.billingCountry,
        postal_code: values.billingZipCode,
        city: values.billingCountry,
        phone: values.billingPhoneNumber,
      };

  if (values.shippingCustomerType === "company") {
    delete shippingAddress.first_name;
    delete shippingAddress.last_name;
  }

  if (values.shippingCustomerType === "individual") {
    delete shippingAddress.company;
  }

  if (values.billingCustomerType === "company") {
    delete billingAddress.first_name;
    delete billingAddress.last_name;
  }

  if (values.billingCustomerType === "individual") {
    delete billingAddress.company;
  }

  return {
    email: values.email,
    shipping_address: shippingAddress,
    billing_address: billingAddress,
  };
};

type GetShippingInitialValuesConfig = {
  shippingAddress?: Address;
  billingAddress?: Address;
  customerEmail?: string;
};

export const getShippingInitialValues = ({
  customerEmail,
  shippingAddress,
  billingAddress,
}: GetShippingInitialValuesConfig): Partial<CheckoutSchemaValues> => {
  return {
    shippingName: shippingAddress?.first_name || undefined,
    shippingSurname: shippingAddress?.last_name || undefined,
    shippingCompany: shippingAddress?.company || undefined,
    shippingAddress1: shippingAddress?.address_1 || undefined,
    shippingAddress2: shippingAddress?.address_2 || undefined,
    shippingCountry: shippingAddress?.country_code || undefined,
    shippingZipCode: shippingAddress?.postal_code || undefined,
    shippingCity: shippingAddress?.city || undefined,
    shippingPhoneNumber: shippingAddress?.phone || undefined,
    billingName: billingAddress?.first_name || undefined,
    billingSurname: billingAddress?.last_name || undefined,
    billingCompany: billingAddress?.company || undefined,
    billingAddress1: billingAddress?.address_1 || undefined,
    billingAddress2: billingAddress?.address_2 || undefined,
    billingCountry: billingAddress?.country_code || undefined,
    billingZipCode: billingAddress?.postal_code || undefined,
    billingCity: billingAddress?.city || undefined,
    billingPhoneNumber: billingAddress?.phone || undefined,
    email: customerEmail,
  };
};
