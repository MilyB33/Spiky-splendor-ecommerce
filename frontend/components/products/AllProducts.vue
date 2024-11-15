<template>
  <div class="d-flex ga-8">
    <Filters :onFiltersChange="onFiltersChange" />

    <v-divider
      vertical
      :thickness="4"
    ></v-divider>

    <div class="d-flex flex-column ga-8">
      <ProductsHeader
        :products="products"
        :onChangeOrder="onChangeOrder"
      />
      <ProductList
        :isLoading="isLoading"
        :products="products"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { products, isLoading, onFiltersChange, onChangeOrder } = useProducts();
</script>
