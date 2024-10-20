<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title> {{ title }} </v-list-item-title>
      <v-list-item-subtitle> {{ subtitle }} </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts" setup>
type ProductDetailsItemProps = {
  title: string;
  subtitle: string;
};

const props = defineProps<ProductDetailsItemProps>();
</script>
