<template>
  <v-tooltip
    :disabled="!isDisabled"
    text="Płatność jeszcze nie została zaksięgowana"
    location="bottom"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        @click="() => generateInvoice(orderId)"
        :disabled="isDisabled"
        style="pointer-events: auto"
      >
        Pobierz fakturę
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import type { Invoice } from "~/types";

type GenerateInvoiceProps = {
  orderId: string;
  paymentStatus: string;
  invoice?: Invoice;
};

const props = defineProps<GenerateInvoiceProps>();

const { generateInvoice, isGeneratingInvoice } = useOrders();

const isDisabled = computed(
  () => props.paymentStatus !== "captured" || !props.invoice || isGeneratingInvoice.value,
);
</script>
