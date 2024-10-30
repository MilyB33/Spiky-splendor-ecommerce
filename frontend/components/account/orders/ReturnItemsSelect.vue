<template>
  <section class="d-flex flex-column ga-4">
    <h4>Przedmioty do zwrotu</h4>

    <v-table>
      <tbody>
        <tr v-for="(item, index) in orderItems">
          <td>
            <v-checkbox
              class="text-truncate"
              :label="item.title"
              color="green"
              hide-details
              v-model="items[index].isSelected"
            ></v-checkbox>
          </td>

          <td>
            <div class="d-flex ga-4 align-center">
              <v-btn
                icon
                variant="text"
                @click="() => decrement(index)"
                density="compact"
                :disabled="items[index].quantity <= 1"
              >
                <v-icon>mdi-minus-circle-outline</v-icon>
              </v-btn>

              <span>{{ items[index].quantity }}</span>

              <v-btn
                icon
                variant="text"
                @click="() => increment(index)"
                density="compact"
                :disabled="items[index].quantity === item.quantity"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </div>
          </td>
          <td>
            <span>{{ formatCurrency(item.total, selectedRegion?.currency_code) }}</span>
          </td>
        </tr>
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
// TODO: Make total adjust to quantity
import type { Order } from "@medusajs/medusa";
import { useCommonStore } from "~/store/common";
import { formatCurrency } from "~/utils/product";
import type { ReturnSchemaValues } from "~/utils/validation/return-schema";

const { selectedRegion } = useCommonStore();

type ReturnItemsSelectProps = {
  orderItems: Order["items"];
};

const increment = (index: number) => {
  items.value[index].quantity++;
};

const decrement = (index: number) => {
  if (items.value[index].quantity > 1) {
    items.value[index].quantity--;
  }
};

defineProps<ReturnItemsSelectProps>();

const { value: items, errorMessage: itemsError } = useField<ReturnSchemaValues["items"]>("items");
const isAnySelected = computed(() => items.value.some((item) => item.isSelected));
</script>
