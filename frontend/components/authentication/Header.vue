<template>
  <NuxtLink
    to="/"
    class="text-decoration-none text-black"
  >
    <div class="header">
      <v-icon
        size="64"
        color="green_primary"
        >mdi-cactus</v-icon
      >

      <p class="text-h3">Spiky Splendor</p>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
