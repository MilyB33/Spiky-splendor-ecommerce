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
      <!-- TODO fix type -->
      <CategoryNavigationButton
        v-if="categories"
        v-for="category in categories"
        :key="category.id"
        :category="category as ProductCategory"
      />

      <CommonNavigationButton to="/about">About</CommonNavigationButton>
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

    <CartButton />

    <v-divider
      vertical
      class="mx-3 align-self-center"
      length="32"
      thickness="2"
    />

    <RegionsMenu />
  </v-toolbar>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import { type ProductCategory } from "~/types";

const isOpen = defineModel<boolean>("isOpen");

const { categories } = useCategories();
const { wishlist } = useWishlist();
const { mobile } = useDisplay({ mobileBreakpoint: "sm" });

const toggleButton = () => {
  isOpen.value = !isOpen.value;
};
</script>
