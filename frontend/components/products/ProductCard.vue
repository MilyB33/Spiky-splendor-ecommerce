<template>
  <v-sheet
    elevation="1"
    rounded
    class="overflow-hidden px-3 py-3 d-flex flex-column"
  >
    <div class="position-relative">
      <v-img
        v-if="product.thumbnail"
        :width="225"
        :height="225"
        cover
        :src="product.thumbnail"
        :alt="product.title"
        class="thumbnail"
      ></v-img>

      <div class="favorite-button">
        <favorite-button
          size="small"
          variant="tonal"
        />
      </div>
    </div>
    <div class="mt-2 d-flex flex-column ga-1">
      <h4>
        {{ product.title }}
      </h4>

      <h6
        class="category"
        v-if="product.categories?.length"
      >
        {{ product.categories[0].name }}
      </h6>

      <div class="d-flex align-center ga-1">
        <div class="status-circle--available"></div>
        <span class="text-body-2">Available</span>
      </div>
    </div>

    <div class="d-flex align-center ga-1 mt-2 justify-space-between">
      <v-btn
        icon="mdi-cart-plus"
        size="x-small"
        color="green_primary"
      />

      <v-btn
        size="small"
        color="green_primary"
        class="read-more-btn"
        append-icon="mdi-arrow-right"
        rounded
      >
        Read More
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type ProductCardProps = {
  product: PricedProduct;
};

defineProps<ProductCardProps>();
</script>

<style scoped lang="scss">
.thumbnail {
  width: 225px;
  height: 225px;
  border-radius: 5px;
  object-fit: cover;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.category {
  color: #8d99ae;
}

.status-circle--available {
  background-color: #80b918;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
