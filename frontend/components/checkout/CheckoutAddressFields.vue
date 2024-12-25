<template>
  <v-radio-group
    inline
    hide-details="auto"
    v-model="customerType"
    :error-messages="customerTypeError"
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
      class="w-50 mb-auto"
      v-model="name"
      :error-messages="nameError"
      @update:model-value="onChangeField"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      label="Last name"
      density="compact"
      hide-details="auto"
      class="w-50 mb-auto"
      v-model="surname"
      :error-messages="surnameError"
      @update:model-value="onChangeField"
    ></v-text-field>
  </div>

  <v-text-field
    variant="outlined"
    label="Company"
    density="compact"
    hide-details="auto"
    v-if="isCompany"
    v-model="company"
    :error-messages="companyError"
    @update:model-value="onChangeField"
  ></v-text-field>

  <v-text-field
    variant="outlined"
    label="Address 1"
    density="compact"
    hide-details="auto"
    v-model="address1"
    :error-messages="address1Error"
    @update:model-value="onChangeField"
  ></v-text-field>

  <v-text-field
    variant="outlined"
    label="Address 2"
    density="compact"
    hide-details="auto"
    v-model="address2"
    :error-messages="address2Error"
    @update:model-value="onChangeField"
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
      class="w-50 mb-auto"
      v-model="country"
      :error-messages="countryError"
      @update:model-value="onChangeField"
    ></v-select>

    <v-text-field
      variant="outlined"
      label="Zip code"
      density="compact"
      hide-details="auto"
      class="w-50 mb-auto"
      v-model="zipCode"
      :error-messages="zipCodeError"
      @update:model-value="onChangeField"
    ></v-text-field>
  </div>

  <div class="d-flex ga-4">
    <v-text-field
      variant="outlined"
      label="City"
      density="compact"
      hide-details="auto"
      v-model="city"
      :error-messages="cityError"
      @update:model-value="onChangeField"
    ></v-text-field>
  </div>

  <v-text-field
    variant="outlined"
    label="Phone"
    density="compact"
    hide-details="auto"
    v-model="phone"
    :error-messages="phoneError"
    @update:model-value="onChangeField"
  ></v-text-field>
</template>

<script lang="ts" setup>
type CheckoutAddressFieldsProps = {
  addressType: "shipping" | "billing";
  onChangeField?: () => void;
};

const props = defineProps<CheckoutAddressFieldsProps>();

const { availableCountries } = useAddresses();

const isCompany = computed(() => customerType.value === "company");

const { value: customerType, errorMessage: customerTypeError } = useField<string>(
  `${props.addressType}CustomerType`,
);

const { value: name, errorMessage: nameError } = useField<string>(`${props.addressType}Name`);
const { value: surname, errorMessage: surnameError } = useField<string>(
  `${props.addressType}Surname`,
);

const { value: company, errorMessage: companyError } = useField<string>(
  `${props.addressType}Company`,
);
const { value: address1, errorMessage: address1Error } = useField<string>(
  `${props.addressType}Address1`,
);
const { value: address2, errorMessage: address2Error } = useField<string>(
  `${props.addressType}Address2`,
);
const { value: country, errorMessage: countryError } = useField<string>(
  `${props.addressType}Country`,
);
const { value: zipCode, errorMessage: zipCodeError } = useField<string>(
  `${props.addressType}ZipCode`,
);
const { value: city, errorMessage: cityError } = useField<string>(`${props.addressType}City`);
const { value: phone, errorMessage: phoneError } = useField<string>(
  `${props.addressType}PhoneNumber`,
);
</script>
