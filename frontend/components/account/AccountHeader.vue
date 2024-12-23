<template>
  <div class="d-flex ga-8 align-center justify-space-between">
    <h1>{{ label }}</h1>
    <v-btn
      @click="logCustomerOut"
      :disabled="isLoggingCustomerOut"
    >
      Log out
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { isLoggingCustomerOut, logCustomerOut } = useAuth();

const label = computed(() => {
  switch (route.path) {
    case "/account/orders":
      return "Your orders";
    case "/account/returns":
      return "Your returns";
    case "/account/address":
      return "Your addresses";
    case "/account/details":
      return "Personal data";
    default:
      return "Your account";
  }
});
</script>
