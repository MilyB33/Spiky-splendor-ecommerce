<template>
  <div
    v-if="isLoading"
    class="d-flex justify-center align-center fill-height"
  >
    <v-progress-circular
      size="80"
      width="8"
      indeterminate
    />
  </div>
  <div
    class="list"
    v-else
  >
    <template v-for="product in products?.products">
      <!-- TODO: Fix type -->
      <ProductCard :product="product as PricedProduct" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProductStore } from "~/store/products";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

const productStore = useProductStore();
const { products, isLoading } = storeToRefs(productStore);

onMounted(async () => {
  if (!isLoading.value) {
    await productStore.retrieveProductList({});
  }
});
</script>

<style scoped lang="scss">
.list {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
