<template>
  <v-toolbar :elevation="3">
    <Progress />

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
      <Logo />
    </template>

    <v-toolbar-items
      v-if="!mobile"
      class="ml-md-8 ml-4"
    >
      <CommonNavigationButton to="/">Home</CommonNavigationButton>
      <CommonNavigationButton to="/products">Products</CommonNavigationButton>
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

const { mobile } = useDisplay({ mobileBreakpoint: 830 });

const toggleButton = () => {
  isOpen.value = !isOpen.value;
};
</script>
