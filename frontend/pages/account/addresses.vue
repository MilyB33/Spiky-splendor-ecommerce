<template>
  <Head>
    <Title>My addresses</Title>
  </Head>

  <div class="w-100">
    <Addresses />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
