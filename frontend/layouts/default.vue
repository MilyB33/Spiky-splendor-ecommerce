<template>
  <div class="w-100">
    <TopNavigation v-model:isOpen="isOpen" />
    <Sidebar
      v-model:isOpen="isOpen"
      v-if="mobile"
    />
    <v-main
      max-width="1200"
      class="d-flex mx-auto pa-8 w-100"
    >
      <slot />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const isOpen = defineModel<boolean>();

const { mobile } = useDisplay({ mobileBreakpoint: "sm" });
</script>
