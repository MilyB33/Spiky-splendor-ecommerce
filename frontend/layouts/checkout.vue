<template>
  <v-layout class="d-flex flex-column py-8 px-16">
    <v-progress-circular
      v-if="isFetchingShippingMethods"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <header
      class="checkout-header"
      v-if="!isFetchingShippingMethods"
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

      <div>
        <CheckoutTimeline />
      </div>
    </header>

    <v-main v-if="!isFetchingShippingMethods">
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

.checkout-header {
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 8px 0;
  width: 100%;
}
</style>
