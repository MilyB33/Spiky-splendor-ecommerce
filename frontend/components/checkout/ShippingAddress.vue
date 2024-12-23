<template>
  <section class="d-flex justify-start flex-column ga-4">
    <h4>Adres dostawy</h4>

    <v-radio-group
      inline
      hide-details="auto"
      v-model="shippingCustomerType"
      :error-messages="shippingCustomerTypeError"
    >
      <v-radio
        label="Individual"
        value="individual"
        color="green"
      ></v-radio>
      <v-radio
        label="Company"
        value="company"
        color="green"
      ></v-radio>
    </v-radio-group>

    <div
      class="d-flex ga-4"
      v-if="!isCompany"
    >
      <v-text-field
        variant="outlined"
        label="First name"
        density="compact"
        hide-details="auto"
        class="w-50"
        v-model="shippingName"
        :error-messages="shippingNameError"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        label="Last name"
        density="compact"
        hide-details="auto"
        class="w-50"
        v-model="shippingSurname"
        :error-messages="shippingSurnameError"
      ></v-text-field>
    </div>

    <v-text-field
      variant="outlined"
      label="Company"
      density="compact"
      hide-details="auto"
      v-if="isCompany"
      v-model="shippingCompany"
      :error-messages="shippingCompanyError"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Email"
      density="compact"
      hide-details="auto"
      persistent-hint
      v-model="shippingEmail"
      :error-messages="shippingEmailError"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Address 1"
      density="compact"
      hide-details="auto"
      v-model="shippingAddress1"
      :error-messages="shippingAddress1Error"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Address 2"
      density="compact"
      hide-details="auto"
      v-model="shippingAddress2"
      :error-messages="shippingAddress2Error"
    ></v-text-field>

    <div class="d-flex ga-4">
      <v-select
        variant="outlined"
        label="Country"
        density="compact"
        hide-details="auto"
        :items="availableCountries"
        item-title="name"
        item-value="code"
        class="w-50"
        v-model="shippingCountry"
        :error-messages="shippingCountryError"
      ></v-select>

      <v-text-field
        variant="outlined"
        label="Zip code"
        density="compact"
        hide-details="auto"
        class="w-50"
        v-model="shippingZipCode"
        :error-messages="shippingZipCodeError"
      ></v-text-field>
    </div>

    <div class="d-flex ga-4">
      <v-text-field
        variant="outlined"
        label="City"
        density="compact"
        hide-details="auto"
        v-model="shippingCity"
        :error-messages="shippingCityError"
      ></v-text-field>
    </div>

    <v-text-field
      variant="outlined"
      label="Phone"
      density="compact"
      hide-details="auto"
      v-model="shippingPhoneNumber"
      :error-messages="shippingPhoneNumberError"
    ></v-text-field>
  </section>
</template>

<script lang="ts" setup>
import type { Country } from "@medusajs/medusa";
import { useField } from "vee-validate";
import { COUNTRIES } from "~/constant";

const { region } = useRegions();

const availableCountries = computed(() => {
  return COUNTRIES.filter((country) => {
    const selectedRegionCountries = region.value?.countries.map(
      (selectedRegionCountry: Country) => {
        return selectedRegionCountry.iso_2;
      },
    );

    //@ts-ignore
    return selectedRegionCountries.includes(country.code.toLocaleLowerCase());
  }).map((filtererCountry) => {
    return {
      ...filtererCountry,
      code: filtererCountry.code.toLocaleLowerCase(),
    };
  });
});

const isCompany = computed(() => shippingCustomerType.value === "company");
const { value: shippingCustomerType, errorMessage: shippingCustomerTypeError } =
  useField<string>("shippingCustomerType");
const { value: shippingName, errorMessage: shippingNameError } = useField<string>("shippingName");
const { value: shippingSurname, errorMessage: shippingSurnameError } =
  useField<string>("shippingSurname");
const { value: shippingCompany, errorMessage: shippingCompanyError } =
  useField<string>("shippingCompany");
const { value: shippingEmail, errorMessage: shippingEmailError } =
  useField<string>("shippingEmail");
const { value: shippingAddress1, errorMessage: shippingAddress1Error } =
  useField<string>("shippingAddress1");
const { value: shippingAddress2, errorMessage: shippingAddress2Error } =
  useField<string>("shippingAddress2");
const { value: shippingCountry, errorMessage: shippingCountryError } =
  useField<string>("shippingCountry");
const { value: shippingZipCode, errorMessage: shippingZipCodeError } =
  useField<string>("shippingZipCode");
const { value: shippingCity, errorMessage: shippingCityError } = useField<string>("shippingCity");
const { value: shippingPhoneNumber, errorMessage: shippingPhoneNumberError } =
  useField<string>("shippingPhoneNumber");
</script>
