<template>
  <v-btn>
    <NuxtLink
      :to="to"
      class="text-decoration-none text-black w-full h-full"
      exact-active-class="text-decoration-underline"
      ><slot
    /></NuxtLink>
  </v-btn>
</template>

<script setup lang="ts">
type CommonNavigationButtonProps = {
  to: string;
};

defineProps<CommonNavigationButtonProps>();
</script>
