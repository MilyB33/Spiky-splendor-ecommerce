<template>
  <tr>
    <td>
      <v-checkbox
        class="text-truncate"
        :label="item.title"
        color="green"
        hide-details
        @update:model-value="() => onToggle(item.id)"
      ></v-checkbox>
    </td>

    <td>
      <div class="d-flex ga-4 align-center">
        <v-btn
          icon
          variant="text"
          @click="() => decrement(item.id)"
          density="compact"
          :disabled="quantity <= 1"
        >
          <v-icon>mdi-minus-circle-outline</v-icon>
        </v-btn>

        <span>{{ quantity }}</span>

        <v-btn
          icon
          variant="text"
          @click="() => increment(item.id)"
          density="compact"
          :disabled="quantity === item.quantity"
        >
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </div>
    </td>
    <td>
      <span>{{ formatCurrency(total, region?.currency_code) }}</span>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { type LineItem } from "~/types";
import { formatCurrency } from "~/utils/product";

type ReturnItemsSelectRowProps = {
  item: LineItem;
  decrement: (id: string) => void;
  increment: (id: string) => void;
  onToggle: (id: string) => void;
  quantity: number;
};

const props = defineProps<ReturnItemsSelectRowProps>();

const { region } = useRegions();

const total = computed(() => {
  return ((props.item.total || 0) / props.item.quantity) * props.quantity;
});
</script>
