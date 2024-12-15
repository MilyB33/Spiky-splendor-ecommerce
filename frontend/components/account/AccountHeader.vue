<template>
  <div class="d-flex ga-8 align-center justify-space-between">
    <h1>{{ label }}</h1>
    <v-btn
      @click="logCustomerOut"
      :disabled="isLoggingCustomerOut"
      >Wyloguj się</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { isLoggingCustomerOut, logCustomerOut } = useAuth();

const label = computed(() => {
  switch (route.path) {
    case "/account/orders":
      return "Twoje zamówienia";
    case "/account/returns":
      return "Twoje zwroty";
    case "/account/address":
      return "Twoje adresy";
    case "/account/details":
      return "Dane osobowe";
    default:
      return "Twoje konto";
  }
});
</script>
