<template>
  <v-app>
    <SnackbarProvider>
      <div
        v-if="isCheckingSession"
        class="d-flex justify-center align-center fill-height"
      >
        <v-progress-circular
          size="80"
          width="8"
          indeterminate
        />
      </div>
      <NuxtLayout v-else>
        <NuxtPage />
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
import { onMounted } from "vue";
import { useAuthStore } from "./store/auth";

const authStore = useAuthStore();
const { isCheckingSession, isAuthenticated } = storeToRefs(authStore);

onMounted(async () => {
  if (!isAuthenticated.value && !isCheckingSession.value) {
    await authStore.checkCustomerSession();
  }
});
</script>
