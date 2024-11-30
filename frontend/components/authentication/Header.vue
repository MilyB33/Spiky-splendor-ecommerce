<template>
  <NuxtLink
    to="/"
    class="text-decoration-none text-black"
  >
    <div class="d-flex align-center justify-center ga-2">
      <v-icon
        :size="isMobile ? 48 : 64"
        color="green_primary"
        >mdi-cactus</v-icon
      >

      <p :class="isMobile ? 'text-h4' : 'text-h3'">Spiky Splendor</p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "sm" });
</script>
