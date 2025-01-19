<template>
  <Head>
    <Title>Personal details</Title>
  </Head>

  <div class="w-100">
    <AccountPersonalDetails />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
