<template>
  <v-card class="checkout-section">
    <!-- TODO: use v-img here -->
    <img
      width="160"
      height="160"
      src="/shopping-cart.png"
      alt="cart icon"
      class="mx-auto mb-10"
    />

    <div
      class="w-100"
      v-if="!isAuthenticated"
    >
      <p class="text-caption mb-4">Sign in to save order on your account!</p>
      <NuxtLink
        to="/login?login=true"
        class="text-decoration-none"
      >
        <v-btn
          block
          color="black"
          >Sign in</v-btn
        >
      </NuxtLink>
    </div>

    <v-divider
      class="border-opacity-75"
      color="black"
      :thickness="6"
    ></v-divider>

    <div class="d-flex justify-space-between text-h6 w-100">
      <p>Total:</p>
      <p>{{ total }}</p>
    </div>

    <NuxtLink to="/checkout/shipping">
      <v-btn class="w-100">Checkout {{ !isAuthenticated ? "(continue as a guest)" : "" }}</v-btn>
    </NuxtLink>
  </v-card>
</template>

<script lang="ts" setup>
import { formatCurrency } from "~/utils/product";

const { cart } = useCart();
const { isAuthenticated } = useCustomer();
const { region } = useRegions();

const total = computed(() => {
  return formatCurrency(cart.value?.cart.subtotal || 0, region.value?.currency_code);
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
