<template>
  <Head>
    <Title>Dashboard</Title>
  </Head>

  <div class="w-100">
    <AccountDashboard />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
