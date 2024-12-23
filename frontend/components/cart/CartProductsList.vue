<template>
  <v-card class="cart-items-section">
    <div class="cart-items-section__wrapper">
      <div class="d-flex ga-4 align-center">
        <h2>Cart</h2>
        <v-chip
          color="deep-purple-accent-4"
          label
        >
          {{ itemsCount }}
          {{ countLabel }}
        </v-chip>
      </div>

      <div class="d-flex flex-column mt-8">
        <template
          v-for="cartItem in cartItems"
          :key="cartItem.id"
        >
          <v-divider></v-divider>
          <CartItem :line-item="cartItem" />
        </template>
      </div>
      <v-divider></v-divider>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
const { cart } = useCart();

const cartItems = computed(() => cart.value?.cart.items || []);
const itemsCount = computed(() => cartItems.value.length || 0);
const countLabel = computed(() => (itemsCount.value > 1 ? "products" : "product"));
</script>

<style lang="scss" scoped>
.cart-items-section {
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 24px;

  &__wrapper {
    width: 100%;
  }
}
</style>
