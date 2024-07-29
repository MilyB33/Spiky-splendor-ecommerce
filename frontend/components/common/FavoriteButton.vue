<template>
  <v-btn
    icon="mdi-heart-outline"
    :size="$props.size"
    :variant="$props.variant"
    color="green_primary"
  />
</template>

<script setup lang="ts">
import type { VBtn } from "vuetify/components";

type FavoriteButtonProps = { size?: string | number; variant?: VBtn["variant"] };

withDefaults(defineProps<FavoriteButtonProps>(), {
  variant: "text",
});
</script>
