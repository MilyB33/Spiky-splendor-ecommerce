<template>
  <div>
    <div class="d-flex flex-column ga-4">
      <h2>Lista produktów ({{ products?.count || 0 }})</h2>
      <div class="d-flex justify-start ga-2 align-center">
        <FiltersModal
          v-if="isMobile"
          :onFiltersChange="onFiltersChange"
          :initial-filters="initialFilters"
        />
        <v-select
          v-model="value"
          density="compact"
          width="300"
          class="flex-grow-0"
          variant="solo-filled"
          :hide-details="true"
          @update:model-value="onChangeOrder"
          :items="items"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductsListResponse } from "~/types";
import { useDisplay } from "vuetify";
import type { ProductFiltersSchemaValues } from "~/utils/validation/product-filters-schema";

type OrderValues = "price" | "-price" | "title" | "-title";

defineProps<{
  products?: ProductsListResponse;
  onChangeOrder: (order: OrderValues) => void;
  onFiltersChange: (values: ProductFiltersSchemaValues) => void;
  initialFilters: ProductFiltersSchemaValues;
}>();

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });

const value = ref<OrderValues>("title");

const items = [
  {
    value: "price",
    title: "cena rosnąco",
  },
  {
    value: "-price",
    title: "cena malejąco",
  },
  {
    value: "title",
    title: "nazwa rosnąco",
  },
  {
    value: "-title",
    title: "nazwa malejąco",
  },
];
</script>
