<template>
  <v-card class="pa-4 w-100">
    <div style="max-width: 700px">
      <ShippingAddress />
      <v-divider
        :thickness="2"
        class="my-4"
      ></v-divider>
      <BillingAddress />
      <v-divider
        :thickness="2"
        class="my-4"
      ></v-divider>
      <ShippingMethods />
    </div>
  </v-card>

  <ShippingSummary :is-valid="isValid" />
</template>

<script lang="ts" setup>
import { useFormValues } from "vee-validate";

import { checkoutSchema, type CheckoutSchemaValues } from "~/utils/validation/shipping-schema";

const values = useFormValues<CheckoutSchemaValues>();

const isValid = computed(() => {
  const result = checkoutSchema.safeParse(values.value);

  return result.success;
});
</script>
