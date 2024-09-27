<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "checkout",
  middleware: "checkout",
});
</script>
