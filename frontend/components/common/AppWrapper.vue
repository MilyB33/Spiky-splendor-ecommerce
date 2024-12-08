<template>
  <div
    v-if="isLoading"
    class="d-flex justify-center align-center fill-height"
  >
    <v-progress-circular
      size="80"
      width="8"
      indeterminate
    />
  </div>

  <NuxtLayout v-else>
    <NuxtPage class="w-100" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { isLoading } = useInitialize();
</script>
