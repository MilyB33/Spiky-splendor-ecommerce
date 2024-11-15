<template>
  <div>
    <div class="d-flex flex-column ga-4">
      <h2>Lista produktów ({{ products?.count || 0 }})</h2>
      <v-select
        v-model="value"
        density="compact"
        width="300"
        variant="solo-filled"
        @update:model-value="onChangeOrder"
        :items="items"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductsListResponse } from "~/types";

type OrderValues = "price" | "-price" | "title" | "-title";

defineProps<{
  products?: ProductsListResponse;
  onChangeOrder: (order: OrderValues) => void;
}>();

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
