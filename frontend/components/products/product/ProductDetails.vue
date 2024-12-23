<template>
  <v-expansion-panels>
    <v-expansion-panel title="Details of the plant"
      ><v-expansion-panel-text>
        <v-list>
          <ProductDetailsItem
            :title="`Plant form`"
            :subtitle="plantForms"
          />
          <ProductDetailsItem
            :title="`Placement: `"
            :subtitle="plantPlacement"
          />
          <ProductDetailsItem
            :title="`Pot diameter: `"
            :subtitle="product.pot_diameter?.toString() + ' cm' ?? 'no data'"
          />
          <ProductDetailsItem
            :title="`Target plant height: `"
            :subtitle="`From ${product.min_height} to ${product.max_height} cm`"
          />
          <ProductDetailsItem
            :title="`Required amount of water: `"
            :subtitle="product.plant_water_demand?.name ?? 'no data'"
          />
          <ProductDetailsItem
            :title="`Plant weight (including pot): `"
            :subtitle="product.weight?.toString() + ' g' ?? 'no data'"
          />
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type ProductDetailsProps = {
  product: PricedProduct;
};

const props = defineProps<ProductDetailsProps>();
const plantForms = computed(
  () => props.product.plant_forms?.map((form) => form.name).join(", ") ?? "",
);
const plantPlacement = computed(
  () => props.product.plant_placements?.map((placement) => placement.name).join(", ") ?? "",
);
</script>
