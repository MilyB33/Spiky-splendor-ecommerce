<template>
  <div class="d-flex flex-column ga-4">
    <h4 class="text-h4 text-green text-center">Gallery</h4>
    <v-divider :thickness="3"></v-divider>
    <div class="gallery">
      <v-img
        class="image"
        src="/landing/landing-1.jpg"
      ></v-img>
      <v-img
        class="image"
        src="/landing/landing-2.jpg"
      ></v-img>
      <v-img
        class="image"
        src="/landing/landing-3.jpg"
      ></v-img>
      <v-img
        class="image"
        src="/landing/landing-4.jpg"
      ></v-img>
      <v-img
        class="image"
        src="/landing/landing-5.jpg"
      ></v-img>
      <v-img
        class="image"
        src="/landing/landing-6.jpg"
      ></v-img>
    </div>
  </div>
</template>

<style lang="scss" setup>
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
}

img {
  border-radius: 10px;
}
</style>
