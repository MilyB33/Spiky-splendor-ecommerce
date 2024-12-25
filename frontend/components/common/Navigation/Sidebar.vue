<template>
  <v-navigation-drawer
    location="left"
    temporary
    v-model="isOpen"
  >
    <div class="d-flex align-center justify-center py-4 w-100">
      <Logo />
    </div>

    <div class="d-flex flex-column mt-4">
      <SidebarNavigationButton to="/">Home</SidebarNavigationButton>
      <SidebarNavigationButton to="/products">Products</SidebarNavigationButton>
      <SidebarNavigationButton to="/about">FAQ</SidebarNavigationButton>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen");
</script>
