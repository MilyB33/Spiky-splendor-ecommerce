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
      <NuxtLink
        to="/"
        class="d-flex align-center text-decoration-none text-green"
      >
        <v-icon
          icon="mdi-cactus"
          size="x-large"
          color="green_primary"
        />
        <v-toolbar-title>Spiky Splendor</v-toolbar-title>
      </NuxtLink>
    </template>

    <v-toolbar-items
      v-if="!mobile"
      class="ml-md-8 ml-4"
    >
      <CommonNavigationButton to="/products">Produkty</CommonNavigationButton>

      <CommonNavigationButton to="/contact">Kontakt</CommonNavigationButton>
      <CommonNavigationButton to="/about">FAQ</CommonNavigationButton>
    </v-toolbar-items>

    <v-spacer />

    <NuxtLink
      to="/wishlist"
      class="button text-decoration-none text-black"
      active-class="button--active"
    >
      <v-btn
        icon="mdi-heart-outline"
        variant="text"
        color="green_primary"
      >
      </v-btn>
    </NuxtLink>

    <NavigationAccountMenu />

    <v-divider
      vertical
      class="mx-3 align-self-center"
      length="32"
      thickness="2"
    />

    <MenuCart />
  </v-toolbar>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const isOpen = defineModel<boolean>("isOpen");

const { categories } = useCategories();
const { mobile } = useDisplay({ mobileBreakpoint: "sm" });

const toggleButton = () => {
  isOpen.value = !isOpen.value;
};
</script>
