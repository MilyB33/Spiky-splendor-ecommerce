<template>
  <div>
    <TopNavigation v-model:isOpen="isOpen" />
    <Sidebar
      v-model:isOpen="isOpen"
      v-if="mobile"
    />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const isOpen = defineModel<boolean>();

const { mobile } = useDisplay({ mobileBreakpoint: "sm" });
</script>
