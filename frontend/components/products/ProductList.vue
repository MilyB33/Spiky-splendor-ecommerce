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
    class="d-flex ga-2 flex-wrap justify-center"
  >
    <template v-for="product in props.products?.products">
      <ProductCard :product="product" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProductsListResponse } from "~/types";
const props = defineProps<{ products?: ProductsListResponse; isLoading: boolean }>();
</script>
