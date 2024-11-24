<template>
  <div class="d-flex flex-column ga-4">
    <h4 class="text-h4 text-green text-center">Galeria</h4>
    <v-divider :thickness="3"></v-divider>
    <div class="gallery">
      <ImageWithSkeleton src="/landing/landing-1.jpg"></ImageWithSkeleton>
      <ImageWithSkeleton src="/landing/landing-2.jpg"></ImageWithSkeleton>
      <ImageWithSkeleton src="/landing/landing-3.jpg"></ImageWithSkeleton>
      <ImageWithSkeleton src="/landing/landing-4.jpg"></ImageWithSkeleton>
      <ImageWithSkeleton src="/landing/landing-5.jpg"></ImageWithSkeleton>
      <ImageWithSkeleton src="/landing/landing-6.jpg"></ImageWithSkeleton>
    </div>
  </div>
</template>

<style lang="scss" setup>
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

img {
  border-radius: 10px;
}
</style>
