<template>
  <Payment v-if="!isLoadingCart" />
</template>

<script setup lang="ts">
const { isLoadingCart } = useCart();

definePageMeta({
  layout: "checkout",
  middleware: "checkout",
});
</script>
