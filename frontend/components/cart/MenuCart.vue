<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      location="bottom center"
      :open-on-hover="!isMobile"
      transition="slide-y-transition"
      close-on-content-click
      :open-on-focus="false"
      offset="8"
      :disabled="isCartMenuDisabled"
    >
      <template v-slot:activator="{ props }">
        <NuxtLink
          to="/cart"
          class="text-black"
        >
          <v-btn
            v-if="isMobile"
            icon="mdi-cart-outline"
            v-bind="props"
          />

          <v-btn
            v-else
            prepend-icon="mdi-cart-outline"
            v-bind="props"
          >
            <template v-slot:prepend>
              <v-badge
                v-if="!!hasItems"
                :content="itemsCount"
                color="light_green"
              >
                <v-icon size="x-large" />
              </v-badge>

              <v-icon
                size="x-large"
                v-else
              />
            </template>

            Twój koszyk
          </v-btn>
        </NuxtLink>
      </template>

      <menu-cart-skeleton v-if="isFetchingCart" />

      <v-card
        width="300px"
        class="d-flex flex-column ga-4 pa-2"
        v-else
      >
        <div
          class="cart-item-list"
          v-if="hasItems"
        >
          <template
            v-for="(cartItem, index) in cartItems"
            :key="cartItem.id"
          >
            <menu-cart-item :line-item="cartItem" />
            <v-divider
              v-if="index !== cartItems.length - 1"
              :thickness="2"
            ></v-divider>
          </template>
        </div>

        <p
          v-else
          class="text-center"
        >
          Cart is empty
        </p>

        <v-divider :thickness="4"></v-divider>

        <div class="d-flex justify-space-between w-100">
          <p>Subtotal:</p>
          <p>{{ subtotal }}</p>
        </div>

        <NuxtLink to="/cart">
          <v-btn
            color="black"
            width="100%"
            v-if="hasItems"
            >Cart</v-btn
          >
        </NuxtLink>
      </v-card>
    </v-menu>
  </div>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { formatCurrency } from "~/utils/product";

const route = useRoute();
const { mobile: isMobile } = useDisplay({ mobileBreakpoint: 1040 });
const { cart, isFetchingCart } = useCart();
const { region } = useRegions();
const menu = ref(false);

const cartItems = computed(() => cart.value?.cart.items || []);

const subtotal = computed(() =>
  formatCurrency(cart.value?.cart.subtotal || 0, region.value?.currency_code),
);
const hasItems = computed(() => !!cartItems.value.length);
const itemsCount = computed(() => {
  if (cartItems.value.length > 6) return "6+";

  return cartItems.value.length.toString();
});
// TODO: this can be resolved better
const isCartMenuDisabled = computed(() => {
  return route.path.includes("cart") || !hasItems.value;
});
</script>

<style scoped lang="scss">
.cart-item-list {
  max-height: 250px;
  overflow: auto;
}
</style>
