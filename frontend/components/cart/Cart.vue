<template>
  <div
    v-if="!showEmptyState"
    class="cart-container"
  >
    <div class="cart-items-section">
      <div class="cart-items-section__wrapper">
        <div class="d-flex ga-4 align-center">
          <h1>Cart</h1>
          <v-chip
            color="deep-purple-accent-4"
            label
          >
            {{ itemsCount }}
            {{ countLabel }}
          </v-chip>
        </div>

        <div class="d-flex flex-column ga-4 mt-8">
          <template
            v-for="cartItem in cartItems"
            :key="cartItem.id"
          >
            <cart-item :line-item="cartItem" />
          </template>
        </div>
      </div>
    </div>
    <v-sheet class="checkout-section">
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

      <div class="d-flex justify-space-between text-h5 w-100">
        <p>Total:</p>
        <p>{{ total }}</p>
      </div>

      <NuxtLink to="/checkout/shipping">
        <v-btn class="w-100">Checkout {{ !isAuthenticated ? "(continue as a guest)" : "" }}</v-btn>
      </NuxtLink>
    </v-sheet>
  </div>

  <CartEmptyState v-else />
</template>

<script lang="ts" setup>
import { pluralize } from "~/utils/string";
import { useCommonStore } from "~/store/common";
import { formatCurrency } from "~/utils/product";

const { cart, isFetchingCart } = useCart();
const commonStore = useCommonStore();
const { selectedRegion } = storeToRefs(commonStore);
const { isAuthenticated } = useCustomer();

const cartItems = computed(() => cart.value?.cart.items || []);
const itemsCount = computed(() => cartItems.value.length || 0);
const countLabel = computed(() => pluralize("item", itemsCount.value));
const total = computed(() => {
  return formatCurrency(cart.value?.cart.total || 0, selectedRegion.value?.currency_code);
});
const showEmptyState = computed(() => !itemsCount.value && !isFetchingCart.value);
</script>

<style lang="scss" scoped>
.cart-container {
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100vh - 96px);

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 520px;
  }
}
.cart-items-section,
.checkout-section {
  display: flex;
  flex-direction: column;
}

.cart-items-section {
  align-items: end;
  padding: 24px;

  &__wrapper {
    width: 100%;
  }
}

.checkout-section {
  padding: 48px;
  padding-top: 10vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
