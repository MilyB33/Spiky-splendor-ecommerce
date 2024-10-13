<template>
  <v-card class="d-flex flex-column ga-4 pa-4">
    <div class="d-flex align-center ga-4">
      <v-icon icon="mdi-shield-check-outline" />
      <span>Safe delivery guaranteed</span>
      <v-tooltip
        max-width="200"
        location="bottom"
        text="Over 99% of shipments reach our customers intact. If the parcel is damaged in transit, we will refund your money."
      >
        <template v-slot:activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-information-slab-circle-outline"
          />
        </template>
      </v-tooltip>
    </div>

    <div class="d-flex align-center ga-4">
      <v-icon icon="mdi-truck-delivery-outline" />
      <span>
        Shipment on <span style="color: limegreen">{{ returnCurrentDayName() }}</span>
      </span>
      <v-tooltip
        max-width="200"
        location="bottom"
        text="To keep the plants fresh, we ship them from Monday to Wednesday inclusive. We don't want the plants to stay in warehouses over the weekend."
      >
        <template v-slot:activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-information-slab-circle-outline"
          />
        </template>
      </v-tooltip>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { returnCurrentDayName } from "~/utils/date";
</script>
