<template>
  <v-card
    class="pa-4"
    width="40%"
    style="height: fit-content"
    min-width="150"
  >
    <h3>Order Ships Feed</h3>
    <div class="d-flex flex-column ga-4 mt-4">
      <div class="d-flex justify-space-between">
        <p>Items ({{ cartItemsCount }}):</p>
        <p>{{ formatCurrency(cartPrice, currencyCode) }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <p>Shipping:</p>
        <p>{{ formatCurrency(shippingMethodPrice, currencyCode) }}</p>
      </div>

      <v-divider></v-divider>
      <div class="d-flex justify-space-between text-h6">
        <p>Total:</p>
        <p>{{ formatCurrency(totalPrice, currencyCode) }}</p>
      </div>

      <v-btn
        type="submit"
        color="green"
        :disabled="isSubmitButtonDisabled"
        :loading="isLoading"
      >
        Continue</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts" setup>
type ShippingSummaryProps = {
  isValid: boolean;
};
import { formatCurrency } from "~/utils/product";
import type { CheckoutSchemaValues } from "~/utils/validation/shipping-schema";

const props = defineProps<ShippingSummaryProps>();
const checkoutFormValues = useFormValues<CheckoutSchemaValues>();
const { cart, isUpdatingCart } = useCart();
const { region } = useRegions();

const currencyCode = computed(() => region.value?.currency_code);
const cartItemsCount = computed(() => cart.value?.cart.items.length || 0);
const cartPrice = computed(() => cart.value?.cart.total || 0);
const shippingMethodPrice = computed(() => checkoutFormValues.value.shippingMethod?.price || 0);

const totalPrice = computed(() => {
  return cartPrice.value + shippingMethodPrice.value;
});
const isSubmitButtonDisabled = computed(() => {
  return !props.isValid || isUpdatingCart.value;
});
const isLoading = computed(() => {
  return isUpdatingCart.value;
});
</script>
