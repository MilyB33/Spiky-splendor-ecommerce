<template>
  <Head>
    <Title>Authentication</Title>
  </Head>

  <div class="w-100 h-100 d-flex flex-column ga-4">
    <Header />
    <v-divider :thickness="3"></v-divider>
    <AuthenticationTabs />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  middleware: "auth",
});
</script>
