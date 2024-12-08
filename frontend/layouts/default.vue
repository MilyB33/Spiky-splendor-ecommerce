<template>
  <div class="w-100">
    <TopNavigation v-model:isOpen="isOpen" />
    <Sidebar
      v-model:isOpen="isOpen"
      v-if="mobile"
    />
    <v-main
      max-width="1200"
      class="d-flex mx-auto w-100"
      :class="mobile ? 'px-2 py-8' : 'pa-8'"
    >
      <slot />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const isOpen = defineModel<boolean>();

const { mobile } = useDisplay({ mobileBreakpoint: 830 });
</script>
