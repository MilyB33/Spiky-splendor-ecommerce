<template>
  <NuxtLayout name="default">
    <div class="w-100">
      <AccountHeader />

      <v-divider
        class="my-8"
        :thickness="2"
      />

      <div
        class="d-flex ga-12"
        :class="isMobile ? 'flex-column' : 'flex-row'"
      >
        <AccountNavigationMobile v-if="isMobile" />

        <AccountNavigation v-else />

        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "sm" });
</script>
