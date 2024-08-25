<template>
  <!-- TODO: Fix type -->
  <ProductList
    :isLoading="isLoading"
    :products="products as ProductsListResponse"
  />
</template>

<script setup lang="ts">
import type { ProductsListResponse } from "~/types";

const { products, isLoading } = useProducts();
</script>
