<template>
  <Header />
  <AuthenticationTabs />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  middleware: "auth",
});
</script>
