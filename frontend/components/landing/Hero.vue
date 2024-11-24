<template>
  <div class="d-flex flex-column ga-4 align-center justify-center hero-container">
    <div class="hero-image"></div>
    <h2
      class="text-white text-h2"
      style="z-index: 1"
    >
      Witaj w Spiky Splendor
    </h2>
    <NuxtLink to="/products/succulents">
      <v-btn color="white">Odkryj nasze roślin</v-btn>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.hero-container {
  position: relative;
  width: 1136px;
  height: 400px;
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
