<template>
  <v-card class="d-flex flex-column ga-4 pa-4">
    <div>
      <span> Do you have questions about this product?</span>
      {{ " " }}
      <NuxtLink
        color="black"
        to="/contact"
        >Write to us!</NuxtLink
      >
    </div>
    <div class="d-flex flex-column ga-4">
      <p>Phone: 123 456 789</p>
      <p>Email: example@example.com</p>
    </div>
    <p>Mon. - Thu. 9:00 - 16:00</p>
  </v-card>
</template>

<style scoped lang="scss">
a {
  color: #000;
}
</style>
