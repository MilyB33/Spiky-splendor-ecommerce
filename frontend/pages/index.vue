<template>
  <h1>Index page</h1>
  <v-btn
    @click="generateInvoice"
    :disabled="isGeneratingInvoice"
    >Generate invoice</v-btn
  >
</template>

<script lang="ts" setup>
import { useInvoices } from "~/composables/useInvoices";

const { generateInvoice, isGeneratingInvoice } = useInvoices();
</script>
