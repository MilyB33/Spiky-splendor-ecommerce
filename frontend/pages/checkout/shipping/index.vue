<template>
  <Head>
    <Title>Checkout - Shipping</Title>
  </Head>

  <Shipping />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "checkout",
  middleware: "checkout",
});
</script>
