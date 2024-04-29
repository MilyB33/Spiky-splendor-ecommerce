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
import { useAuthStore } from "~/store/auth";

const { isCustomerAuthenticated } = useCustomer();
const { mobile } = useDisplay({ mobileBreakpoint: "md" });
const authStore = useAuthStore();

const isOpenMenuOnClick = computed(() => {
  return mobile.value || authStore.isCustomerAuthenticated;
});
</script>
