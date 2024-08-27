<template>
  <div
    v-if="props.isLoading"
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
    <template v-for="product in props.products?.products">
      <ProductCard :product="product" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProductsListResponse } from "~/types";
const props = defineProps<{ products: ProductsListResponse | null; isLoading: boolean }>();
</script>

<style scoped lang="scss">
.list {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
