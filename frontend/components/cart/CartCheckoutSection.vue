<template>
  <v-card class="checkout-section">
    <v-img
      :width="160"
      :height="160"
      :max-height="160"
      src="/shopping-cart.png"
      alt="cart icon"
      class="mx-auto mb-10"
    ></v-img>

    <div
      class="w-100"
      v-if="!isAuthenticated"
    >
      <p class="text-caption mb-4">Log in to save your order to your account.</p>
      <NuxtLink
        to="/login?login=true"
        class="text-decoration-none"
      >
        <v-btn
          block
          color="black"
          >Log in</v-btn
        >
      </NuxtLink>
    </div>

    <v-divider
      class="border-opacity-75"
      color="black"
      :thickness="6"
    ></v-divider>

    <div class="d-flex justify-space-between text-h6 w-100">
      <p>Total value:</p>
      <p>{{ subtotal }}</p>
    </div>

    <NuxtLink to="/checkout/shipping">
      <v-btn class="w-100">Order {{ !isAuthenticated ? "(Continue as a guest)" : "" }}</v-btn>
    </NuxtLink>
  </v-card>
</template>

<script lang="ts" setup>
import { formatCurrency } from "~/utils/product";

const { cart } = useCart();
const { isAuthenticated } = useCustomer();
const { region } = useRegions();

const total = computed(() => {
  return (
    cart.value?.cart.total! -
      cart.value?.cart.shipping_tax_total! -
      cart.value?.cart.shipping_total! || 0
  );
});

const subtotal = computed(() => {
  return formatCurrency(total.value, region.value?.currency_code);
});
</script>

<style lang="scss" scoped>
.checkout-section {
  display: flex;
  flex-direction: column;
  padding: 48px;
  padding-top: 10vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
