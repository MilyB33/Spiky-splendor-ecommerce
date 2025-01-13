<template>
  <NuxtLayout>
    <div
      v-if="isLoading"
      class="d-flex justify-center align-center w-100"
      style="height: calc(100vh - 96px)"
    >
      <v-progress-circular
        size="80"
        width="8"
        indeterminate
      />
    </div>

    <NuxtPage
      class="w-100"
      v-else
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { isLoading } = useInitialize();
</script>
