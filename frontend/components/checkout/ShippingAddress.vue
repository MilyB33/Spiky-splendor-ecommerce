<template>
  <section class="d-flex justify-start flex-column ga-4">
    <h4>Shipping address</h4>

    <v-select
      v-if="!!customer"
      label="Use one of your addresses"
      :disabled="isCustomerHasAnyAddress"
      :items="customerShippingAddresses"
      hide-details="auto"
      density="compact"
      v-model="customerAddress"
      :error-messages="customerAddressError"
      @update:model-value="onCustomerAddressChange"
    ></v-select>

    <CheckoutAddressFields
      address-type="shipping"
      :onChangeField="onChangeShippingField"
    />
  </section>
</template>

<script lang="ts" setup>
import type { Address } from "@medusajs/medusa";
import { useField } from "vee-validate";
import type { CheckoutSchemaValues } from "~/utils/validation/shipping-schema";
const { customer } = useCustomer();

type ShippingAddressProps = {
  setFormValues: (values: Partial<CheckoutSchemaValues>) => void;
};

const props = defineProps<ShippingAddressProps>();

const onCustomerAddressChange = (value: string) => {
  if (!!value && customer.value?.customer) {
    const address: Address = customer.value.customer.shipping_addresses.find(
      (addr) => addr.id === value,
    );

    if (address) {
      props.setFormValues({
        shippingName: address.first_name || "",
        shippingSurname: address.last_name || "",
        shippingAddress1: address.address_1 || "",
        shippingAddress2: address.address_2 || "",
        shippingCountry: address.country_code || "",
        shippingZipCode: address.postal_code || "",
        shippingCity: address.city || "",
        shippingPhoneNumber: address.phone || "",
      });
    }
  }
};

const onChangeShippingField = () => {
  customerAddress.value = undefined;
};

const isCustomerHasAnyAddress = computed(() => {
  return !customer.value?.customer.shipping_addresses.length;
});

const customerShippingAddresses = computed(() => {
  return customer.value?.customer.shipping_addresses.map((address) => ({
    title: address.metadata.name,
    value: address.id,
  }));
});

const { value: customerAddress, errorMessage: customerAddressError } = useField<string | undefined>(
  "shippingCustomerAddress",
);
</script>
