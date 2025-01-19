<template>
  <Head>
    <Title>Checkout - Payment</Title>
  </Head>

  <v-progress-circular
    v-if="isFetchingCart"
    indeterminate
    color="green_primary"
  />

  <Payment v-else />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "checkout",
  middleware: "checkout",
});

const { isFetchingCart } = useCart();
</script>
