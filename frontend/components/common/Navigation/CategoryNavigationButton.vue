<template>
  <CommonNavigationButton :to="`/products/${category.handle}`">{{
    category.name
  }}</CommonNavigationButton>

  <v-btn
    density="compact"
    icon="mdi-menu-down"
  >
    <v-menu
      location="bottom right"
      open-delay="0"
      transition="fade-transition"
      :close-on-content-click="false"
      max-height="700"
      activator="parent"
    >
      <v-list
        :lines="false"
        density="compact"
        nav
        class="pa-0"
      >
        <v-list-item
          v-for="subCategory in category.category_children"
          :key="subCategory.id"
          class="pa-0"
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
      </v-list> </v-menu
  ></v-btn>
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
