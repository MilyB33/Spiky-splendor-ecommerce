<template>
  <ProductList
    :isLoading="isLoading"
    :products="products"
  />
</template>

<script setup lang="ts">
const { products, isLoading } = useGetCategoryProducts();
</script>
