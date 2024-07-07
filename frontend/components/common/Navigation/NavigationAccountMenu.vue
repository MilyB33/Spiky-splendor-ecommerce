<template>
  <v-menu
    :open-on-hover="!isCustomerAuthenticated"
    :open-on-click="isOpenMenuOnClick"
    :close-on-content-click="!isCustomerAuthenticated"
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

    <UserAccountContextMenu v-if="isCustomerAuthenticated" />

    <v-card
      min-width="200"
      v-else
    >
      <AuthenticationButton to="/login?login=true">Sign in</AuthenticationButton>

      <v-divider
        thickness="2"
        class="mx-4"
      />

      <AuthenticationButton to="/login?register=true">Sign up</AuthenticationButton>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { isCustomerAuthenticated } = useCustomer();
const { mobile } = useDisplay({ mobileBreakpoint: "md" });
const isAuthenticated = ref(isCustomerAuthenticated);
const isOpenMenuOnClick = computed(() => {
  return mobile.value || isAuthenticated.value;
});
</script>
