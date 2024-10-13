<template>
  <v-expansion-panels>
    <v-expansion-panel title="Details"
      ><v-expansion-panel-text>
        <v-text-field
          placeholder="Caribbean Cruise"
          hide-details
        ></v-text-field>
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
</script>
