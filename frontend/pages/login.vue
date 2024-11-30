<template>
  <Header />
  <v-divider :thickness="3"></v-divider>
  <AuthenticationTabs />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  middleware: "auth",
});
</script>
