<template>
  <section class="address-fields">
    <v-text-field
      variant="outlined"
      label="Imię"
      density="compact"
      hide-details="auto"
      v-model="name"
      :error-messages="nameError"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Nazwisko"
      density="compact"
      hide-details="auto"
      v-model="surname"
      :error-messages="surnameError"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Nazwa firmy (opcjonalne)"
      density="compact"
      hide-details="auto"
      v-model="company"
      :error-messages="companyError"
      style="grid-column: span 2"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Adres 1"
      density="compact"
      hide-details="auto"
      v-model="address1"
      :error-messages="address1Error"
      style="grid-column: span 2"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Adres 2"
      density="compact"
      hide-details="auto"
      v-model="address2"
      :error-messages="address2Error"
      style="grid-column: span 2"
    ></v-text-field>

    <v-select
      variant="outlined"
      label="Kraj"
      density="compact"
      hide-details="auto"
      :items="availableCountries"
      item-title="name"
      item-value="code"
      v-model="country"
      :error-messages="countryError"
    ></v-select>

    <v-text-field
      variant="outlined"
      label="Kod pocztowy"
      density="compact"
      hide-details="auto"
      v-model="zipCode"
      :error-messages="zipCodeError"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Miasto"
      density="compact"
      hide-details="auto"
      v-model="city"
      :error-messages="cityError"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Województwo"
      density="compact"
      hide-details="auto"
      v-model="state"
      :error-messages="stateError"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Numer telefonu"
      density="compact"
      hide-details="auto"
      v-model="phoneNumber"
      :error-messages="phoneNumberError"
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

    // @ts-ignore
    return selectedRegionCountries.includes(country.code.toLocaleLowerCase());
  }).map((filtererCountry) => {
    return {
      ...filtererCountry,
      code: filtererCountry.code.toLocaleLowerCase(),
    };
  });
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: surname, errorMessage: surnameError } = useField<string>("surname");
const { value: company, errorMessage: companyError } = useField<string>("company");
const { value: address1, errorMessage: address1Error } = useField<string>("address1");
const { value: address2, errorMessage: address2Error } = useField<string>("address2");
const { value: country, errorMessage: countryError } = useField<string>("country");
const { value: zipCode, errorMessage: zipCodeError } = useField<string>("zipCode");
const { value: city, errorMessage: cityError } = useField<string>("city");
const { value: state, errorMessage: stateError } = useField<string>("state");
const { value: phoneNumber, errorMessage: phoneNumberError } = useField<string>("phoneNumber");
</script>

<style lang="scss" scoped>
.address-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
