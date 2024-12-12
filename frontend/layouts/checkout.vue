<template>
  <v-layout
    class="d-flex ga-4 flex-column"
    :class="mobile ? 'py-8 px-2' : 'py-8 px-16'"
  >
    <header class="d-flex justify-center">
      <NuxtLink
        to="/"
        class="d-flex align-center text-decoration-none logo-link"
      >
        <v-icon
          icon="mdi-cactus"
          size="x-large"
          color="green_primary"
        />
        <h1>Spiky Splendor</h1>
      </NuxtLink>
    </header>

    <v-main
      max-width="1000"
      class="d-flex mx-auto w-100"
    >
      <v-progress-circular
        v-if="isLoadingCart || !cart || isLoadingShippingMethods"
        indeterminate
        color="green_primary"
      />

      <slot v-else />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { cart, isLoadingCart, isLoadingShippingMethods } = useCart();
const { mobile } = useDisplay({ mobileBreakpoint: "sm" });
</script>

<style lang="scss" scoped>
.logo-link {
  color: black;
}
</style>
