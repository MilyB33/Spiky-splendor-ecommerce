<template>
  <div class="d-flex flex-column ga-4 w-100">
    <v-card class="pa-4 w-100">
      <CheckoutTimeline />
    </v-card>

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
  </div>

  <ShippingSummary
    :is-valid="isValid"
    :is-loading="isLoading"
  />
</template>

<script lang="ts" setup>
import { useFormValues } from "vee-validate";
import { checkoutSchema, type CheckoutSchemaValues } from "~/utils/validation/shipping-schema";

type ShippingCustomerFormFieldsProps = {
  isLoading: boolean;
};

defineProps<ShippingCustomerFormFieldsProps>();

const values = useFormValues<CheckoutSchemaValues>();

const isValid = computed(() => {
  const result = checkoutSchema.safeParse(values.value);

  return result.success;
});
</script>
