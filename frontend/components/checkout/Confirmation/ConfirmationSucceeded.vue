<template>
  <img
    src="/check.png"
    alt="success check mark icon"
    width="100"
    height="100"
  />

  <h2>Zamówienie zostało opłacone</h2>

  <div>
    <p>Twój numer zamówienia: #{{ lastOrder?.order.display_id }}</p>

    <p>Dziękujemy za zakupy.</p>
  </div>

  <div class="w-100 d-flex flex-column ga-3">
    <v-btn
      v-if="lastOrder?.order.id"
      color="blue"
      block
      :disabled="isGeneratingInvoice"
      @click="() => generateInvoice(lastOrder?.order.id || '')"
      >Pobierz fakturę</v-btn
    >
    <NuxtLink
      to="/"
      class="text-decoration-none w-100"
    >
      <v-btn
        color="green"
        block
        :disabled="isGeneratingInvoice"
        >Kontynuuj</v-btn
      >
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { lastOrder, generateInvoice, isGeneratingInvoice } = useOrders();
</script>
