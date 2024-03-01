<script setup lang="ts">
const products = await useProducts();
</script>

<template>
  <div>{{ products }}</div>
  <v-btn>button</v-btn>
</template>
