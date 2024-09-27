<template>
  <v-card
    class="pa-4 text-center mx-auto"
    max-width="800"
  >
    <img
      src="/empty-cart.png"
      width="128"
      height="128"
      alt="empty cart icon"
    />

    <h2>Your cart is empty</h2>

    <v-divider :thickness="2" />

    <div class="d-flex ga-4 flex-column align-center mx-auto">
      <p>
        Look at our
        <NuxtLink
          class="text-decoration-none products-link"
          to="/products/succulents"
          >products</NuxtLink
        >, maybe something will catch your eye.
      </p>

      <p>
        Should your cart be full? The cart may be cleared after 30 days of absence from our website
        or when changing browsers. If none of these cases apply to you and your basket has been
        cleared,
        <NuxtLink
          to="/"
          class="text-decoration-none report-error-link"
          >report an error</NuxtLink
        >.
      </p>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
// TODO: use theme variable and add proper link above ^
.report-error-link {
  color: crimson;
}

.products-link {
  color: orange;
}
</style>
