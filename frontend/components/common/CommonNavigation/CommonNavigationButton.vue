<template>
  <NuxtLink
    :to="to"
    class="button text-decoration-none text-black w-100 h-100"
    exact-active-class="button--active"
  >
    <v-btn
      rounded="0"
      variant="plain"
      ><slot /></v-btn
  ></NuxtLink>
</template>

<script setup lang="ts">
type CommonNavigationButtonProps = {
  to: string;
};

defineProps<CommonNavigationButtonProps>();
</script>

<style lang="scss" scoped>
.button {
  border-radius: 0;
  &--active {
    border-bottom: 2px solid black;
  }

  &:hover {
    border-bottom: 2px solid black;
  }
}
</style>
