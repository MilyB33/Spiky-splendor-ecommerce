<template>
  <div class="d-flex flex-wrap justify-space-between">
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

    <AddToCartButton
      :product="product"
      :quantity="counter"
      v-slot="slotProps"
    >
      <v-btn
        size="large"
        max-width="400"
        width="100%"
        color="black"
        append-icon="mdi-cart-outline"
        @click="slotProps.props.onAddToCart"
        :loading="slotProps.props.isAddToCartDisabled"
        :disabled="slotProps.props.isAddToCartDisabled"
        >Add to cart</v-btn
      >
    </AddToCartButton>
  </div>
</template>

<script lang="ts" setup>
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { getProductQuantity } from "~/utils/product";

type ProductCartActionProps = {
  product: PricedProduct;
};

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
</script>
