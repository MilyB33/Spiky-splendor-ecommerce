<template>
  <v-card class="d-flex flex-column ga-3 pa-4">
    <v-img
      v-if="product.thumbnail"
      :width="180"
      :height="180"
      cover
      :src="product.thumbnail"
      :alt="product.title"
    ></v-img>
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

      <div class="">
        <span>{{ price }}</span>
      </div>
    </div>

    <NuxtLink
      class="read-more-btn"
      :to="`/products/${product.handle}`"
    >
      <v-btn
        size="small"
        color="green_primary"
        append-icon="mdi-arrow-right"
        block
      >
        Read More
      </v-btn>
    </NuxtLink>
  </v-card>
</template>

<script lang="ts" setup>
import { formatCurrency } from "~/utils/product";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type RecommendedProductCardProps = {
  product: PricedProduct;
};

const props = defineProps<RecommendedProductCardProps>();

const { region } = useRegions();

const price = computed(() => {
  return props.product.variants.reduce((prev, curr) => {
    return formatCurrency(curr.calculated_price_incl_tax || 0, region.value?.currency_code);
  }, "");
});
</script>

<style lang="scss" scoped>
.read-more-btn {
  text-decoration: none;
}
</style>
