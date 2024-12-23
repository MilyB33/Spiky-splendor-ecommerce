<template>
  <section class="d-flex flex-column ga-4">
    <h4>Items to be returned</h4>

    <v-table>
      <tbody>
        <ReturnItemsSelectRow
          v-for="(item, index) in orderItems"
          :item="item"
          :isSelected="items[index].isSelected"
          :decrement="decrement"
          :increment="increment"
          :quantity="items[index].quantity"
        />
      </tbody>
    </v-table>

    <span
      class="text-red text-caption"
      v-if="!!itemsError && !isAnySelected"
      >{{ itemsError }}</span
    >
  </section>
</template>

<script lang="ts" setup>
import type { Order } from "@medusajs/medusa";
import type { ReturnSchemaValues } from "~/utils/validation/return-schema";

type ReturnItemsSelectTableProps = {
  orderItems: Order["items"];
};

const increment = (id: string) => {
  const itemIndex = items.value.findIndex((item) => item.id === id);

  if (itemIndex === -1) return;

  items.value[itemIndex].quantity++;
};

const decrement = (id: string) => {
  const itemIndex = items.value.findIndex((item) => item.id === id);

  if (itemIndex === -1) return;

  if (items.value[itemIndex].quantity > 1) {
    items.value[itemIndex].quantity--;
  }
};

defineProps<ReturnItemsSelectTableProps>();

const { value: items, errorMessage: itemsError } = useField<ReturnSchemaValues["items"]>("items");
const isAnySelected = computed(() => items.value.some((item) => item.isSelected));
</script>
