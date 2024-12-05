<template>
  <article class="py-4 cart-item">
    <v-img
      v-if="lineItem.thumbnail"
      :width="160"
      :height="160"
      cover
      :src="lineItem.thumbnail"
      :alt="lineItem.title"
      class="rounded thumbnail"
    ></v-img>

    <div class="info">
      <h4
        class="text-truncate"
        :title="lineItem.title"
      >
        {{ lineItem.title }}
      </h4>
    </div>

    <div class="remove">
      <v-btn
        class="h-auto"
        variant="text"
        color="pink"
        size="small"
        prepend-icon="mdi-cart-remove"
        @click="() => deleteItemFromCart(lineItem.id)"
        >Usuń</v-btn
      >
    </div>

    <div class="quantity">
      <v-select
        density="compact"
        variant="solo"
        style="width: 130px"
        hide-details
        :items="selectItems"
        item-value="quantity"
        single-line
        v-model="selected"
        v-on:update:model-value="onChangeQuantity"
      ></v-select>
    </div>

    <div class="price">
      <p>{{ price }}</p>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { LineItem } from "@medusajs/medusa";
import { formatCurrency } from "~/utils/product";

type CartItemProps = {
  lineItem: LineItem;
};

const { deleteItemFromCart, updateItemInCart } = useCart();
const { region } = useRegions();

const props = defineProps<CartItemProps>();

const price = computed(() => {
  return formatCurrency(props.lineItem.total || 0, region.value?.currency_code);
});

const selectItems = [
  { title: "0 (remove)", quantity: "remove", props: { color: "red" } },
  { title: "1", quantity: 1 },
  { title: "2", quantity: 2 },
  { title: "3", quantity: 3 },
  { title: "4", quantity: 4 },
  { title: "5", quantity: 5 },
  { title: "6", quantity: 6 },
  { title: "7", quantity: 7 },
  { title: "8", quantity: 8 },
  { title: "9", quantity: 9 },
  { title: "10", quantity: 10 },
];
const selected = ref<number | "remove">(props.lineItem.quantity);

const onChangeQuantity = (quantity: number | "remove") => {
  if (quantity === "remove") {
    deleteItemFromCart(props.lineItem.id);
    return;
  }

  updateItemInCart({ line_item_id: props.lineItem.id, quantity });
};
</script>

<style lang="scss" scoped>
.cart-item {
  display: grid;
  grid-template-areas:
    "img remove"
    "info info"
    "quantity price";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content max-content max-content;
  gap: 16px;

  @media (min-width: 550px) {
    grid-template-areas:
      "img info remove"
      "img quantity price";
    grid-template-columns: max-content auto max-content;
    grid-template-rows: 1fr max-content;
  }
}

.thumbnail {
  grid-area: img;
}

.info {
  grid-area: info;
  display: flex;
  min-width: 0;
}

.remove {
  grid-area: remove;
  margin-left: auto;
}

.quantity {
  grid-area: quantity;
}

.price {
  grid-area: price;
  display: flex;
  align-items: end;
  justify-content: end;
}
</style>
