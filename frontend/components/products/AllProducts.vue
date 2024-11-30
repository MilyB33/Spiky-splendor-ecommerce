<template>
  <div class="d-flex ga-8 w-100">
    <Filters
      v-if="!isMobile"
      :onFiltersChange="onFiltersChange"
      :initial-filters="initialFilters"
    />

    <v-divider
      v-if="!isMobile"
      vertical
      :thickness="4"
    ></v-divider>

    <div class="d-flex flex-column ga-8 w-100">
      <ProductsHeader
        :products="products"
        :onChangeOrder="onChangeOrder"
        :onFiltersChange="onFiltersChange"
        :initial-filters="initialFilters"
      />
      <ProductList
        :isLoading="isLoading"
        :products="products"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { products, isLoading, initialFilters, onFiltersChange, onChangeOrder } = useProducts();
const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });
</script>
