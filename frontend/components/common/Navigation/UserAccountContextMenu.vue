<template>
  <v-card>
    <NuxtLink
      to="/account"
      class="text-decoration-none text-black"
    >
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
    </NuxtLink>

    <v-divider />

    <v-btn
      variant="text"
      append-icon="mdi-logout"
      block
      class="d-flex justify-space-between"
      @click="logCustomerOut"
      :disabled="isLoggingCustomerOut"
    >
      <template v-slot:append>
        <v-icon size="large" />
      </template>
      Log out
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
const { logCustomerOut, isLoggingCustomerOut } = useAuth();
</script>
