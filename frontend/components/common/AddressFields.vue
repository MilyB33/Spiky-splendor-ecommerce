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
      label="Numer telefonu"
      density="compact"
      hide-details="auto"
      v-model="phoneNumber"
      :error-messages="phoneNumberError"
    ></v-text-field>
  </section>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
const { availableCountries } = useAddresses();

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: surname, errorMessage: surnameError } = useField<string>("surname");
const { value: company, errorMessage: companyError } = useField<string>("company");
const { value: address1, errorMessage: address1Error } = useField<string>("address1");
const { value: address2, errorMessage: address2Error } = useField<string>("address2");
const { value: country, errorMessage: countryError } = useField<string>("country");
const { value: zipCode, errorMessage: zipCodeError } = useField<string>("zipCode");
const { value: city, errorMessage: cityError } = useField<string>("city");
const { value: phoneNumber, errorMessage: phoneNumberError } = useField<string>("phoneNumber");
</script>

<style lang="scss" scoped>
.address-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
