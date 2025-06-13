<template>
  <NuxtLayout>
    <div
      v-if="isLoading"
      class="d-flex flex-column ga-4 justify-center align-center w-100"
      style="height: calc(100vh - 96px)"
    >
      <v-progress-circular
        size="80"
        width="8"
        indeterminate
      />

      <template v-if="$config.public.ENVIRONMENT !== 'development'">
        <div>Server is probably starting. It should start in 3 - 5 minutes.</div>
      </template>

      <v-btn
        variant="text"
        @click="refreshPage"
      >
        Refresh
      </v-btn>
    </div>

    <NuxtPage
      class="w-100"
      v-else
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { isLoading } = useInitialize();

function refreshPage() {
  window.location.reload();
}
</script>
