<template>
  <div
    v-if="props.isLoading"
    class="d-flex justify-center align-center"
  >
    <v-progress-circular
      size="80"
      width="8"
      indeterminate
    />
  </div>
  <div
    v-else
    class="d-flex flex-column ga-12"
  >
    <div class="list">
      <template v-for="product in props.products?.products">
        <ProductCard :product="product" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductsListResponse } from "~/types";
const props = defineProps<{ products?: ProductsListResponse; isLoading: boolean }>();
</script>

<style scoped lang="scss">
.list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  height: fit-content;
}
</style>
