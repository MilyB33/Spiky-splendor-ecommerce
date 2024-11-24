<template>
  <v-img
    :src="src"
    @load="setLoaded"
  ></v-img>
  <v-skeleton-loader
    v-if="!isLoaded"
    type="image"
    class="skeleton"
  ></v-skeleton-loader>
</template>

<script lang="ts" setup>
type ImageWithSkeletonProps = {
  src: string;
};

defineProps<ImageWithSkeletonProps>();

const isLoaded = ref(false);

const setLoaded = () => {
  isLoaded.value = true;
};
</script>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;

  & * {
    height: 100%;
    border-radius: 10px;
  }
}
</style>
