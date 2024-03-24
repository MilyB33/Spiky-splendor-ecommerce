<template>
  <v-btn
    v-if="mobile"
    icon="mdi-cart-outline"
  />

  <v-btn
    v-else
    prepend-icon="mdi-cart-outline"
  >
    <template v-slot:prepend>
      <v-icon size="x-large" />
    </template>

    Your cart
  </v-btn>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay({ mobileBreakpoint: "md" });
</script>
