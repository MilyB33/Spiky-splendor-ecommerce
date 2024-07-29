<template>
  <v-toolbar :elevation="3">
    <template
      v-if="mobile"
      v-slot:prepend
    >
      <v-btn
        icon="mdi-menu"
        @click.stop="toggleButton"
      />
    </template>

    <template
      v-if="!mobile"
      v-slot:prepend
    >
      <v-icon
        icon="mdi-cactus"
        size="x-large"
        color="green_primary"
      />
      <v-toolbar-title>Spiky Splendor</v-toolbar-title>
    </template>

    <v-toolbar-items
      v-if="!mobile"
      class="ml-md-8 ml-4"
    >
      <CommonNavigationButton to="/products">Our Products</CommonNavigationButton>
      <CommonNavigationButton to="/about">About</CommonNavigationButton>
    </v-toolbar-items>

    <v-spacer />

    <FavoriteButton />

    <NavigationAccountMenu />

    <v-divider
      vertical
      class="mx-3 align-self-center"
      length="32"
      thickness="2"
    />

    <CartButton />
  </v-toolbar>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const isOpen = defineModel<boolean>("isOpen");

const { mobile } = useDisplay({ mobileBreakpoint: "sm" });

const toggleButton = () => {
  isOpen.value = !isOpen.value;
};
</script>
