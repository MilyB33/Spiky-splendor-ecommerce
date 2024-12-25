<template>
  <section class="d-flex flex-column ga-4">
    <h4>Billing address</h4>

    <v-checkbox
      hide-details="auto"
      color="green"
      label="The billing address is the same as the shipping address"
      v-model="sameBillingAddress"
      :error-messages="sameBillingAddressError"
    />
    <template v-if="!sameBillingAddress">
      <CheckoutAddressFields address-type="billing" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";

const { value: sameBillingAddress, errorMessage: sameBillingAddressError } =
  useField<string>("sameBillingAddress");
</script>
