<template>
  <v-menu
    v-if="regions"
    offset="8"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props"
      >
        {{ selectedRegion?.name }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="region in regions.regions"
        :key="region.id"
        :value="region.id"
        density="compact"
        class="text-center"
        @click="() => onClick(region)"
      >
        {{ region.name.toUpperCase() }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import type { Region } from "@medusajs/medusa";
import { useCommonStore } from "~/store/common";

const { updateCart } = useCart();
const commonStore = useCommonStore();
const { regions } = useRegions();
const { selectedRegion } = storeToRefs(commonStore);

const onClick = (region: Region) => {
  commonStore.selectRegion(region);
  updateCart({ region_id: region.id });
};
</script>
