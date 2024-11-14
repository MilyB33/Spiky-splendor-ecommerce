<template>
  <div class="d-flex ga-8">
    <Filters :onFiltersChange="onFiltersChange" />

    <v-divider
      vertical
      :thickness="4"
    ></v-divider>

    <ProductList
      :isLoading="isLoading"
      :products="products"
    />
  </div>
</template>

<script setup lang="ts">
const { products, isLoading, onFiltersChange } = useProducts();
</script>
