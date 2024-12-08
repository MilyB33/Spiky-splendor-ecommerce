<template>
  <v-progress-circular
    v-if="isLoadingCart || isLoadingShippingMethods"
    color="primary"
    indeterminate
  ></v-progress-circular>

  <div v-else>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { isLoadingCart, isLoadingShippingMethods } = useCart();
</script>
