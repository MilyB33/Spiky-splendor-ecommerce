<template>
  <v-expansion-panels>
    <v-expansion-panel title="Szczegóły rośliny"
      ><v-expansion-panel-text>
        <v-list>
          <ProductDetailsItem
            :title="`Pokrój rośliny:`"
            :subtitle="plantForms"
          />
          <ProductDetailsItem
            :title="`Stanowisko: `"
            :subtitle="plantPlacement"
          />
          <ProductDetailsItem
            :title="`Średnica doniczki: `"
            :subtitle="product.pot_diameter?.toString() + ' cm' ?? 'brak danych'"
          />
          <ProductDetailsItem
            :title="`Docelowa wysokość rośliny: `"
            :subtitle="`Od ${product.min_height} do ${product.max_height} cm`"
          />
          <ProductDetailsItem
            :title="`Wymagana ilość wody: `"
            :subtitle="product.plant_water_demand?.name ?? 'brak danych'"
          />
          <ProductDetailsItem
            :title="`Waga rośliny (włączając doniczkę): `"
            :subtitle="product.weight?.toString() + ' g' ?? 'brak danych'"
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
