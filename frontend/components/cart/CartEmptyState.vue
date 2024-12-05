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

    <h3>Twój koszyk jest pusty</h3>

    <v-divider
      :thickness="2"
      class="my-5"
    />

    <div class="d-flex ga-4 flex-column align-center mx-auto">
      <p>
        Wygląda na to, że nie dodałeś jeszcze nic do swojego koszyka. Przejrzyj nasze produkty i
        znajdź coś dla siebie!
      </p>

      <NuxtLink
        class="text-decoration-none products-link"
        to="/products"
      >
        <v-btn color="black">Produkty</v-btn>
      </NuxtLink>
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
