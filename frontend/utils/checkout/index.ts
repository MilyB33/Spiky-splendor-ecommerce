import type { CartUpdateProps } from "@medusajs/medusa/dist/types/cart";
import type { CheckoutSchemaValues } from "../validation/shipping-schema";

export const prepareCheckoutDataBeforePayment = (
  values: Omit<CheckoutSchemaValues, "shippingMethod">,
): CartUpdateProps => {
  const shippingAddress: CartUpdateProps["shipping_address"] = {
    first_name: values.shippingName,
    last_name: values.shippingSurname,
    company: values.shippingCompany,
    address_1: values.shippingAddress1,
    address_2: values.shippingAddress2,
    // TODO: fix this to input values be Country codes
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
        // TODO: Add this in medusa
        //  email: values.billingEmail,
        address_1: values.billingAddress1,
        address_2: values.billingAddress2,
        // TODO: fix this
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
    email: values.shippingEmail,
    shipping_address: shippingAddress,
    billing_address: billingAddress,
  };
};
