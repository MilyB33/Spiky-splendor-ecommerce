<template>
  <v-navigation-drawer
    location="left"
    temporary
    v-model="isOpen"
  >
    <v-list-item>
      <div class="d-flex align-center justify-center py-4 w-100">
        <v-icon
          icon="mdi-cactus"
          size="x-large"
          color="green_primary"
        />
        <h6 class="text-h6">Spiky Splendor</h6>
      </div>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item
      link
      title="List Item 1"
    ></v-list-item>
    <v-list-item
      link
      title="List Item 2"
    ></v-list-item>
    <v-list-item
      link
      title="List Item 3"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen");
</script>
