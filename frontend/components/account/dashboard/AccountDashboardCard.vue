<template>
  <v-card
    class="d-flex flex-column ga-4 pa-4"
    color="green-darken-2"
    variant="tonal"
  >
    <div class="d-flex align-center justify-space-between">
      <p class="text-h5 font-weight-bold">{{ title }}</p>
      <NuxtLink :to="link">
        <v-btn
          readonly
          variant="outlined"
          :icon="icon"
          size="x-small"
          color="primary"
        >
        </v-btn>
      </NuxtLink>
    </div>

    <slot></slot>
  </v-card>
</template>

<script lang="ts" setup>
type AccountDashboardCardProps = {
  title: string;
  icon: string;
  link: string;
};

defineProps<AccountDashboardCardProps>();
</script>
