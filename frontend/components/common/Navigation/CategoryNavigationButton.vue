<template>
  <CommonNavigationButton :to="`/products/${category.handle}`">{{
    category.name
  }}</CommonNavigationButton>

  <v-menu
    location="bottom right"
    open-delay="0"
    transition="fade-transition"
    scroll-strategy="close"
    max-height="calc(100vh - 80px)"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-menu-down"
        density="compact"
        v-bind="props"
      >
      </v-btn>
    </template>
    <v-list
      :lines="false"
      density="compact"
      nav
      class="pa-0"
    >
      <v-list-item
        v-for="subCategory in category.category_children"
        :key="subCategory.id"
        class="pa-0 ma-0"
      >
        <NuxtLink
          :to="`/products/${category.handle}/${subCategory.handle}`"
          class="text-decoration-none text-white"
        >
          <v-btn
            class="text-white bg-green"
            width="100%"
            rounded="0"
            :class="{
              'bg-orange_primary': isActiveLink(category, subCategory),
            }"
          >
            {{ subCategory.name }}
          </v-btn>
        </NuxtLink>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { type ProductCategory } from "~/types";
const route = useRoute();

type CategoryNavigationButtonProps = {
  category: ProductCategory;
};

defineProps<CategoryNavigationButtonProps>();

const isActiveLink = (category: ProductCategory, subCategory: ProductCategory) => {
  return route.path === `/products/${category.handle}/${subCategory.handle}`;
};
</script>
