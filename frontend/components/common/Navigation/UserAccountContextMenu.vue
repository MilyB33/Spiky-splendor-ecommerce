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
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

const client = useMedusaClient();
const queryClient = useQueryClient();
const { snackbar } = useSnackbar();

const { mutate } = useMutation({
  mutationFn: () => client.auth.deleteSession(),
  onError: (error) => {
    console.error(error);
    snackbar.error("Something went wrong.");
  },
  onSuccess: () => {
    snackbar.success("Successfully logged out.");
    navigateTo("/");
    queryClient.resetQueries({ queryKey: [API_QUERY_KEY.CUSTOMER], exact: true });
  },
});

const handleLogout = async () => {
  mutate();
};
</script>
