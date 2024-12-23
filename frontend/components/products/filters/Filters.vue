<template>
  <div
    class="d-flex flex-column ga-4 position-relative"
    style="max-width: 240px"
  >
    <div class="d-flex align-center justify-center ga-4">
      <v-btn
        size="large"
        color="green"
        icon="mdi-filter-outline"
        readonly
      />
      <h2>Filters</h2>
    </div>

    <FiltersForm
      :onFiltersChange="onFiltersChange"
      :initialValues="initialFilters"
    />
  </div>
</template>

<script lang="ts" setup>
import { type ProductFiltersSchemaValues } from "~/utils/validation/product-filters-schema";

type FiltersProps = {
  onFiltersChange: (values: ProductFiltersSchemaValues) => void;
  initialFilters: ProductFiltersSchemaValues;
};

defineProps<FiltersProps>();
</script>
