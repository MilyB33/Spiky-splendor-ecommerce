<template>
  <div
    class="cart-item"
    style="min-width: 0"
  >
    <v-img
      v-if="lineItem.thumbnail"
      :width="120"
      :height="120"
      cover
      :src="lineItem.thumbnail"
      :alt="lineItem.title"
      class="thumbnail"
    ></v-img>

    <div
      class="pr-4 d-flex flex-column flex-1"
      style="min-width: 0"
    >
      <h4
        class="d-inline-block text-truncate text-left"
        :title="lineItem.title"
      >
        {{ lineItem.title }}
      </h4>

      <p class="text-caption">Quantity: {{ lineItem.quantity }}</p>

      <p class="align-self-end justify-self-end mt-auto">
        {{ price }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LineItem } from "@medusajs/medusa";
import { formatCurrency } from "~/utils/product";

type MenuCartItemProps = {
  lineItem: LineItem;
};

const props = defineProps<MenuCartItemProps>();

const { region } = useRegions();

const price = computed(() => {
  return formatCurrency(props.lineItem.total || 0, region.value?.currency_code);
});
</script>

<style scoped lang="scss">
.cart-item {
  display: grid;
  grid-template-columns: 120px auto;
  gap: 16px;
}
</style>
