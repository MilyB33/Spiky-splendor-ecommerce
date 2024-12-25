import { Address } from "@medusajs/medusa";
import { COUNTRIES } from "./../../constant/index";

export const getCountryByName = (countryCode?: string | null) => {
  if (countryCode) {
    return COUNTRIES.find((element) => element.code.toLowerCase() === countryCode);
  }

  return COUNTRIES.find((element) => element.code.toLowerCase() === "pl");
};

export const getInitialValues = (address?: Address) => {
  const country = getCountryByName(address?.country_code);

  return {
    name: address?.first_name || undefined,
    surname: address?.last_name || undefined,
    company: address?.company || undefined,
    address1: address?.address_1 || undefined,
    address2: address?.address_2 || undefined,
    country: country?.code.toLowerCase(),
    zipCode: address?.postal_code || undefined,
    city: address?.city || undefined,
    phoneNumber: address?.phone || undefined,
  };
};
