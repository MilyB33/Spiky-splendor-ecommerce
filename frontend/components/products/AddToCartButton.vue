<template>
  <slot :props="{ isAddToCartDisabled, onAddToCart }">
    <v-btn
      icon="mdi-cart-plus"
      size="x-small"
      color="green_primary"
      :disabled="isAddToCartDisabled || !!isAddingToCart"
      @click="onAddToCart"
    />
  </slot>
</template>

<script lang="ts" setup>
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { getProductAvailabilityStatus } from "~/utils/product";
import { API_MUTATIONS_KEY, PRODUCT_AVAILABILITY } from "~/constant";
import { useIsMutating } from "@tanstack/vue-query";

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

const isAddingToCart = useIsMutating({ mutationKey: [API_MUTATIONS_KEY.ADD_TO_CART] });

const isAddToCartDisabled = computed(
  () => isAddingItemToCart.value || productQuantityStatus === PRODUCT_AVAILABILITY.OUT_OF_STOCK,
);
</script>
