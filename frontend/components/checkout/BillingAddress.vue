<template>
  <section class="d-flex flex-column ga-4">
    <h4>Billing Address</h4>

    <v-checkbox
      hide-details="auto"
      color="green"
      label="Shipping address is the same as my billing address"
      v-model="sameBillingAddress"
      :error-messages="sameBillingAddressError"
    />
    <template v-if="!sameBillingAddress">
      <v-radio-group
        inline
        hide-details="auto"
        v-model="billingCustomerType"
        :error-messages="billingCustomerTypeError"
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
          label="Name"
          density="compact"
          hide-details="auto"
          class="w-50"
          v-model="billingName"
          :error-messages="billingNameError"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          label="Surname"
          density="compact"
          hide-details="auto"
          class="w-50"
          v-model="billingSurname"
          :error-messages="billingSurnameError"
        ></v-text-field>
      </div>

      <v-text-field
        variant="outlined"
        label="Company name"
        density="compact"
        hide-details="auto"
        v-if="isCompany"
        v-model="billingCompany"
        :error-messages="billingCompanyError"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        label="Email Address"
        density="compact"
        hide-details="auto"
        v-model="billingEmail"
        :error-messages="billingEmailError"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        label="Address Line 1"
        density="compact"
        hide-details="auto"
        v-model="billingAddress1"
        :error-messages="billingAddress1Error"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        label="Address Line 2"
        density="compact"
        hide-details="auto"
        v-model="billingAddress2"
        :error-messages="billingAddress2Error"
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
          v-model="billingCountry"
          :error-messages="billingCountryError"
        ></v-select>

        <v-text-field
          variant="outlined"
          label="Zip Code/Postal Code"
          density="compact"
          hide-details="auto"
          class="w-50"
          v-model="billingZipCode"
          :error-messages="billingZipCodeError"
        ></v-text-field>
      </div>

      <div class="d-flex ga-4">
        <v-text-field
          variant="outlined"
          label="City"
          density="compact"
          hide-details="auto"
          class="w-50"
          v-model="billingCity"
          :error-messages="billingCityError"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          label="State/Province/Region"
          density="compact"
          hide-details="auto"
          class="w-50"
          v-model="billingState"
          :error-messages="billingStateError"
        ></v-text-field>
      </div>

      <v-text-field
        variant="outlined"
        label="Mobile Phone"
        density="compact"
        hide-details="auto"
        class="w-50"
        v-model="billingPhoneNumber"
        :error-messages="billingPhoneNumberError"
      ></v-text-field>
    </template>
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

    // @ts-ignore
    return selectedRegionCountries.includes(country.code.toLocaleLowerCase());
  }).map((filtererCountry) => {
    return {
      ...filtererCountry,
      code: filtererCountry.code.toLocaleLowerCase(),
    };
  });
});

const isCompany = computed(() => billingCustomerType.value === "company");
const { value: sameBillingAddress, errorMessage: sameBillingAddressError } =
  useField<string>("sameBillingAddress");
const { value: billingCustomerType, errorMessage: billingCustomerTypeError } =
  useField<string>("billingCustomerType");
const { value: billingName, errorMessage: billingNameError } = useField<string>("billingName");
const { value: billingSurname, errorMessage: billingSurnameError } =
  useField<string>("billingSurname");
const { value: billingCompany, errorMessage: billingCompanyError } =
  useField<string>("billingCompany");
const { value: billingEmail, errorMessage: billingEmailError } = useField<string>("billingEmail");
const { value: billingAddress1, errorMessage: billingAddress1Error } =
  useField<string>("billingAddress1");
const { value: billingAddress2, errorMessage: billingAddress2Error } =
  useField<string>("billingAddress2");
const { value: billingCountry, errorMessage: billingCountryError } =
  useField<string>("billingCountry");
const { value: billingZipCode, errorMessage: billingZipCodeError } =
  useField<string>("billingZipCode");
const { value: billingCity, errorMessage: billingCityError } = useField<string>("billingCity");
const { value: billingState, errorMessage: billingStateError } = useField<string>("billingState");
const { value: billingPhoneNumber, errorMessage: billingPhoneNumberError } =
  useField<string>("billingPhoneNumber");
</script>
