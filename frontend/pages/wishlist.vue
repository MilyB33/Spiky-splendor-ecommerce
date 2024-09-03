<template>
  <div
    class="d-flex justify-center"
    :class="isMobile ? 'mt-4' : 'mt-12'"
  >
    <WishlistEmptyState />
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });
</script>
