<template>
  <img
    src="/check.png"
    alt="success check mark icon"
    width="100"
    height="100"
  />

  <h2>The order has been paid</h2>

  <div>
    <p>Your order number: #{{ lastOrder?.display_id }}</p>

    <p>Thank you for shopping.</p>
  </div>

  <div class="w-100 d-flex flex-column ga-3">
    <v-btn
      v-if="lastOrder?.id"
      color="blue"
      block
      :disabled="isGeneratingInvoice"
      @click="() => generateInvoice(lastOrder?.id || '')"
    >
      Download the invoice
    </v-btn>
    <NuxtLink
      to="/"
      class="text-decoration-none w-100"
    >
      <v-btn
        color="green"
        block
        :disabled="isGeneratingInvoice"
        >Continue</v-btn
      >
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { lastOrder, generateInvoice, isGeneratingInvoice } = useOrders();
</script>
