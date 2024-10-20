<template>
  <v-card class="d-flex flex-column ga-4 pa-4">
    <div>
      <span>Masz pytania dotyczące tego produktu?</span>
      {{ " " }}
      <NuxtLink
        color="black"
        to="/contact"
        >Napisz do nas!</NuxtLink
      >
    </div>
    <div class="d-flex flex-column ga-4">
      <p>Telefon: 123 456 789</p>
      <p>Email: example@example.com</p>
    </div>
    <p>Pon. - Czw. 9:00 - 16:00</p>
  </v-card>
</template>

<style scoped lang="scss">
a {
  color: #000;
}
</style>
