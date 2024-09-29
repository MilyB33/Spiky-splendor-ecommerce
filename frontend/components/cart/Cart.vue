<template>
  <div
    v-if="!showEmptyState"
    class="cart-container"
  >
    <CartProductsList />
    <CartCheckoutSection />
  </div>

  <CartEmptyState v-else />
</template>

<script lang="ts" setup>
const { cart, isFetchingCart } = useCart();

const cartItems = computed(() => cart.value?.cart.items || []);
const itemsCount = computed(() => cartItems.value.length || 0);
const showEmptyState = computed(() => !itemsCount.value && !isFetchingCart.value);
</script>

<style lang="scss" scoped>
.cart-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1300px;
  margin-inline: auto;
  min-height: calc(100vh - 96px);

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 520px;
  }
}
</style>
