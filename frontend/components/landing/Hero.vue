<template>
  <div class="d-flex flex-column ga-4 align-center justify-center hero-container">
    <div class="hero-image"></div>
    <h2
      :class="`text-white ${textSize}`"
      style="z-index: 1"
    >
      Welcome to Spiky Splendor
    </h2>
    <NuxtLink to="/products">
      <v-btn
        color="white"
        :size="isMobile ? 'small' : undefined"
      >
        Discover our plants
      </v-btn>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "sm" });
const { mobile: isMedium } = useDisplay({ mobileBreakpoint: 792 });

const textSize = computed(() => {
  if (isMobile.value) {
    return "text-h5";
  }

  if (isMedium.value) {
    return "text-h4";
  }

  return "text-h2";
});
</script>

<style lang="scss" scoped>
.hero-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/6;
  border-radius: 10px;
}

.hero-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("/cactus-hero.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  filter: brightness(0.8);
}
</style>
