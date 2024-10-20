<template>
  <v-menu
    :open-on-hover="!isAuthenticated"
    :open-on-click="isOpenMenuOnClick"
    :close-on-content-click="!isAuthenticated"
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

        Konto
      </v-btn>
    </template>

    <UserAccountContextMenu v-if="isAuthenticated" />

    <v-card
      min-width="200"
      v-else
    >
      <AuthenticationButton to="/login?login=true"> Zaloguj się </AuthenticationButton>

      <v-divider
        thickness="2"
        class="mx-4"
      />

      <AuthenticationButton to="/login?register=true"> Zarejestruj się </AuthenticationButton>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { isAuthenticated } = useCustomer();
const { mobile } = useDisplay({ mobileBreakpoint: "md" });

const isOpenMenuOnClick = computed(() => {
  return mobile.value || isAuthenticated.value;
});
</script>
