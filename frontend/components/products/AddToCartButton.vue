<template>
  <slot :props="{ isAddToCartDisabled, onAddToCart }">
    <v-btn
      icon="mdi-cart-plus"
      size="x-small"
      color="green_primary"
      :disabled="isAddToCartDisabled"
      @click="onAddToCart"
    />
  </slot>
</template>

<script lang="ts" setup>
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { getProductAvailabilityStatus } from "~/utils/product";
import { PRODUCT_AVAILABILITY } from "~/constant";

type AddToCartButtonProps = {
  product: PricedProduct;
  quantity: number;
};

const props = defineProps<AddToCartButtonProps>();

const { addItemToCart, isAddingItemToCart } = useCart();
const productQuantityStatus = getProductAvailabilityStatus(props.product);

const onAddToCart = () => {
  if (props.product.variants[0].id) {
    addItemToCart({ variantId: props.product.variants[0].id, quantity: props.quantity });
  }
};

const isAddToCartDisabled = computed(
  () => isAddingItemToCart.value || productQuantityStatus === PRODUCT_AVAILABILITY.OUT_OF_STOCK,
);
</script>
