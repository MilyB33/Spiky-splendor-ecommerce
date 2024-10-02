<template>
  <img
    src="/check.png"
    alt="success check mark icon"
    width="100"
    height="100"
  />

  <h2>Successful Payment</h2>

  <div>
    <p>Order number: #{{ lastOrder?.order.display_id }}</p>

    <p>Thank you for shopping.</p>
  </div>

  <NuxtLink
    to="/"
    class="text-decoration-none w-100"
  >
    <v-btn
      color="green"
      block
      >Continue</v-btn
    >
  </NuxtLink>
</template>

<script lang="ts" setup>
const { lastOrder } = useOrders();
</script>
