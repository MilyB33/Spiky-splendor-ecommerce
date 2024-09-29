<template>
  <v-layout class="d-flex ga-4 flex-column py-8 px-16">
    <v-progress-circular
      v-if="isFetchingShippingMethods"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <header
      v-if="!isFetchingShippingMethods"
      class="d-flex justify-center"
    >
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
      v-if="!isFetchingShippingMethods"
      max-width="1000"
      class="d-flex mx-auto w-100"
    >
      <slot />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
const { isFetchingShippingMethods } = useCheckout();
</script>

<style lang="scss" scoped>
.logo-link {
  color: black;
}
</style>
