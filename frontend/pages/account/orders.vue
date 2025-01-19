<template>
  <Head>
    <Title>My orders</Title>
  </Head>

  <div class="w-100">
    <Orders />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
