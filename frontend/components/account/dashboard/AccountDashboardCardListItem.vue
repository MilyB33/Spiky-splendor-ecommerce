<template>
  <p class="text-body text-truncate">
    {{ label }}:
    <NuxtLink
      v-if="!value && link"
      :to="link"
      class="text-blue-darken-2"
    >
      Dodaj
    </NuxtLink>
    <span v-else>{{ value }}</span>
  </p>
</template>

<script lang="ts" setup>
type AccountDashboardCardListItemProps = {
  label: string;
  value?: string;
  link?: string;
};

defineProps<AccountDashboardCardListItemProps>();
</script>
