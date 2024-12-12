<template>
  <v-card
    class="pa-4"
    style="height: fit-content"
    min-width="40%"
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
        <p>{{ formatCurrency(cart?.cart.total || 0, currencyCode) }}</p>
      </div>

      <v-btn
        @click="props.pay"
        color="blue"
        :disabled="isSubmitButtonDisabled"
        :loading="isLoading"
      >
        Pay</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts" setup>
type ShippingSummaryProps = {
  pay: () => void;
  isPaying: boolean;
};
import { formatCurrency } from "~/utils/product";

const props = defineProps<ShippingSummaryProps>();
const { cart, isUpdatingCart } = useCart();
const { region } = useRegions();

const currencyCode = computed(() => region.value?.currency_code);
const cartItemsCount = computed(() => cart.value?.cart.items.length || 0);

const cartPrice = computed(
  () =>
    (cart.value?.cart.total || 0) -
    (cart.value?.cart.shipping_total || 0) -
    (cart.value?.cart.shipping_tax_total || 0),
);

const shippingMethodPrice = computed(
  () => (cart.value?.cart.shipping_total || 0) + (cart.value?.cart.shipping_tax_total || 0),
);

const isSubmitButtonDisabled = computed(() => {
  return isUpdatingCart.value || props.isPaying;
});
const isLoading = computed(() => {
  return isUpdatingCart.value || props.isPaying;
});
</script>
