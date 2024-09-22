<template>
  <div class="text-center">
    <v-card
      width="300px"
      class="d-flex flex-column ga-4 pa-2"
    >
      <div class="cart-skeleton-item">
        <v-skeleton-loader type="image"></v-skeleton-loader>

        <div class="pr-4 d-flex flex-column ga-4 flex-1">
          <v-skeleton-loader type="heading"></v-skeleton-loader>
          <v-skeleton-loader
            class="justify-self-end mt-auto"
            type="text"
          ></v-skeleton-loader>
        </div>
      </div>

      <v-divider :thickness="4"></v-divider>

      <v-skeleton-loader type="paragraph"></v-skeleton-loader>
      <v-skeleton-loader type="heading"></v-skeleton-loader>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.cart-skeleton-item {
  display: grid;
  grid-template-columns: 120px auto;
  gap: 16px;
}
</style>
