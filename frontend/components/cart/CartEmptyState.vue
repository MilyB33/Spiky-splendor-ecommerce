<template>
  <v-card
    class="pa-4 text-center mx-auto"
    max-width="400"
    variant="text"
  >
    <img
      src="/empty-cart.png"
      width="248"
      height="248"
      alt="empty cart icon"
    />

    <h3>Your cart is empty</h3>

    <v-divider
      :thickness="2"
      class="my-5"
    />

    <div class="d-flex ga-4 flex-column align-center mx-auto">
      <p>
        It looks like you haven't added anything to your cart yet. Browse our products and find
        something for yourself!
      </p>

      <NuxtLink
        class="text-decoration-none products-link"
        to="/products"
      >
        <v-btn color="black">Products</v-btn>
      </NuxtLink>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.report-error-link {
  color: crimson;
}

.products-link {
  color: orange;
}
</style>
