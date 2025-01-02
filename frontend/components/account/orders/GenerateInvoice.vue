<template>
  <v-tooltip
    :disabled="!isDisabled"
    text="The payment has not yet been captured."
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
        Download the invoice
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
