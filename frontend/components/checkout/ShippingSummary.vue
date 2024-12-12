<template>
  <v-card
    class="pa-4"
    style="height: fit-content"
    min-width="40%"
  >
    <h3>Zamówienie</h3>
    <div class="d-flex flex-column ga-4 mt-4">
      <div class="d-flex justify-space-between">
        <p>Przedmioty ({{ cartItemsCount }}):</p>
        <p>{{ formatCurrency(cartPrice, currencyCode) }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <p>Dostawa:</p>
        <p>{{ formatCurrency(shippingMethodPrice, currencyCode) }}</p>
      </div>

      <v-divider></v-divider>
      <div class="d-flex justify-space-between text-h6">
        <p>Do zapłaty:</p>
        <p>{{ formatCurrency(totalPrice, currencyCode) }}</p>
      </div>

      <v-btn
        type="submit"
        color="green"
        :disabled="!isValid || isLoading"
        :loading="isLoading"
      >
        Kontynuuj</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { formatCurrency } from "~/utils/product";
import type { CheckoutSchemaValues } from "~/utils/validation/shipping-schema";

type ShippingSummaryProps = {
  isValid: boolean;
  isLoading: boolean;
};

defineProps<ShippingSummaryProps>();
const checkoutFormValues = useFormValues<CheckoutSchemaValues>();
const { cart } = useCart();
const { region } = useRegions();

const currencyCode = computed(() => region.value?.currency_code);
const cartItemsCount = computed(() => cart.value?.cart.items.length || 0);
const shippingMethodPrice = computed(() => checkoutFormValues.value.shippingMethod?.price || 0);
const cartPrice = computed(() => {
  if (!cart.value?.cart) return 0;

  const cartTotal = cart.value.cart.total || 0;
  const shippingTotal = cart.value.cart.shipping_total || 0;
  const shippingTax = cart.value.cart.shipping_tax_total || 0;

  return cartTotal - shippingTotal - shippingTax;
});

const totalPrice = computed(() => {
  return cartPrice.value + shippingMethodPrice.value;
});
</script>
