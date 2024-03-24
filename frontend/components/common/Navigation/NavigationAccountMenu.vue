<template>
  <v-menu
    open-on-hover
    :open-on-click="mobile"
    :close-on-content-click="false"
    location="bottom"
    offset="8"
    open-delay="0"
    transition="fade-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="mobile"
        icon="mdi-account-circle-outline"
        v-bind="props"
      />

      <v-btn
        v-else
        prepend-icon="mdi-account-circle-outline"
        v-bind="props"
      >
        <template v-slot:prepend>
          <v-icon size="x-large" />
        </template>

        Account
      </v-btn>
    </template>

    <v-card min-width="200">
      <AuthenticationButton to="/login#login">Sign in</AuthenticationButton>

      <v-divider
        thickness="2"
        class="mx-4"
      />

      <AuthenticationButton to="/login#register">Sign up</AuthenticationButton>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay({ mobileBreakpoint: "md" });
</script>
