<template>
  <v-list>
    <v-list-item>
      <NuxtLink :to="to">
        <v-btn
          variant="outlined"
          class="text-black w-100"
        >
          <slot />
        </v-btn>
      </NuxtLink>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

type AuthenticationButtonProps = {
  to: RouteLocationRaw;
};

defineProps<AuthenticationButtonProps>();
</script>
