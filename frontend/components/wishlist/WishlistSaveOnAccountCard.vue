<template>
  <v-sheet
    elevation="1"
    rounded
    max-width="250"
    class="container overflow-hidden px-3 py-3 ga-2 text-center"
  >
    <v-img
      width="225"
      height="225"
      src="/cactus-save-for-later.png"
      alt="save on your account cactus image"
      class="image"
    ></v-img>
    <h3>Want to save the list to your account?</h3>

    <NuxtLink to="/login?login=true">
      <v-btn
        variant="outlined"
        class="text-black w-100"
        size="small"
      >
        Log in!
      </v-btn>
    </NuxtLink>
  </v-sheet>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  align-items: center;
}

.image {
  width: 225px;
  height: 225px;
  border-radius: 5px;
  object-fit: cover;
}
</style>
