<template>
  <v-btn
    icon="mdi-heart-outline"
    :size="$props.size"
    :variant="$props.variant"
    :color="$props.color"
    :style="$props.style"
  >
  </v-btn>
</template>

<script setup lang="ts">
import type { VBtn } from "vuetify/components";

type FavoriteButtonProps = {
  size?: string | number;
  variant?: VBtn["variant"];
  color?: VBtn["color"];
  style?: VBtn["style"];
};

withDefaults(defineProps<FavoriteButtonProps>(), {
  variant: "text",
  color: "green_primary",
});
</script>
