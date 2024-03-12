<template>
  <v-toolbar :elevation="3">
    <template v-slot:prepend>
      <v-icon
        icon="mdi-cactus"
        size="x-large"
        color="green_primary"
      />
      <v-toolbar-title>Spiky Splendor</v-toolbar-title>
    </template>

    <v-toolbar-items class="ml-8">
      <CommonNavigationButton to="/products">Our Products</CommonNavigationButton>
      <CommonNavigationButton to="/about">About</CommonNavigationButton>
    </v-toolbar-items>

    <v-spacer />

    <CartButton />

    <v-divider
      vertical
      class="mx-3 align-self-center"
      length="32"
      thickness="2"
    />

    <CommonNavigationAccountMenu />
  </v-toolbar>
</template>
