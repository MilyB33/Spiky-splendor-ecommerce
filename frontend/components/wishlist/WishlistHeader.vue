<template>
  <v-card class="d-flex align-center ga-6 mb-2 pa-2">
    <v-img
      src="/cactus-flower.png"
      :width="isMobile ? 48 : 64"
      :height="isMobile ? 48 : 64"
      class="flex-0-1"
    >
    </v-img>
    <h1 :class="isMobile ? 'text-h5' : 'text-h4'">Your favorite products</h1>
  </v-card>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "sm" });
</script>
