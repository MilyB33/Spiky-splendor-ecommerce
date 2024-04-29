<template>
  <v-card>
    <v-btn
      variant="text"
      block
      append-icon="mdi-cog-outline"
      class="d-flex justify-space-between"
    >
      <template v-slot:append>
        <v-icon
          size="large"
          class="ml-auto"
        />
      </template>

      Settings
    </v-btn>

    <v-divider />

    <v-btn
      variant="text"
      append-icon="mdi-logout"
      block
      class="d-flex justify-space-between"
      @click="handleLogout"
    >
      <template v-slot:append>
        <v-icon size="large" />
      </template>
      Log out
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const { logoutCustomer } = useAuthStore();
const { snackbar } = useSnackbar();

const handleLogout = async () => {
  try {
    await logoutCustomer();
    snackbar.success("Successfully logged out.");
    navigateTo("/");
  } catch (error) {
    console.error(error);
    snackbar.error("Something went wrong.");
  }
};
</script>
