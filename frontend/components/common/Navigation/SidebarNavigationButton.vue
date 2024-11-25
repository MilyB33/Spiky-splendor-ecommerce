<template>
  <NuxtLink
    :to="to"
    class="link text-decoration-none text-black w-100 h-100"
    active-class="link--active"
  >
    <v-btn
      rounded="0"
      variant="plain"
      size="large"
      class="button"
      block
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
  text-align: left !important;
  box-sizing: content-box;

  * {
    width: 100%;
    justify-content: left;
  }
}

.link {
  border-radius: 0;

  &--active {
    border-left: 4px solid black;
  }
}
</style>
