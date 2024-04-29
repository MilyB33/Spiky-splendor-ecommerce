<template>
  <v-app>
    <SnackbarProvider>
      <NuxtLayout>
        <v-progress-circular
          size="80"
          width="8"
          indeterminate
          v-if="isCheckingSession"
        />
        <NuxtPage v-else />
      </NuxtLayout>
    </SnackbarProvider>
  </v-app>
</template>

<style lang="scss" scoped>
.v-application {
  background-color: #e0e0e0;
}
</style>

<script setup lang="ts">
import { useAuthStore } from "./store/auth";

const { isCheckingSession } = useAuthStore();
</script>
