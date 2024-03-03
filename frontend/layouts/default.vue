<template>
  <!-- <CommonNavigation /> -->
  <div :class="$style.main">
    <slot />
  </div>
</template>

<style lang="scss" module>
@use "~/assets/scss/components/default-layout.module.scss";
</style>
