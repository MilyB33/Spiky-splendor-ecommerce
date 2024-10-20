<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex ga-4 align-center">
      <v-btn
        icon
        variant="text"
        @click="decrement"
        density="compact"
        :disabled="counter <= 1"
      >
        <v-icon>mdi-minus-circle-outline</v-icon>
      </v-btn>

      <span class="text-h6">{{ counter }}</span>

      <v-btn
        icon
        variant="text"
        @click="increment"
        density="compact"
        :disabled="counter === productQuantity"
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>

    <v-btn
      size="large"
      max-width="400"
      width="100%"
      color="black"
      append-icon="mdi-cart-outline"
      @click="onAddToCart"
      :loading="isCreatingLineItem"
      >Add to cart</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { getProductQuantity } from "~/utils/product";

type ProductCartActionProps = {
  product: PricedProduct;
};
const { addItemToCart, isCreatingLineItem } = useCart();

const props = defineProps<ProductCartActionProps>();

const counter = ref(1);

const productQuantity = getProductQuantity(props.product);

const increment = () => {
  counter.value++;
};

const decrement = () => {
  if (counter.value > 1) {
    counter.value--;
  }
};

const onAddToCart = () => {
  if (!props.product.variants[0].id) return;

  addItemToCart({ variantId: props.product.variants[0].id, quantity: counter.value });
};
</script>
