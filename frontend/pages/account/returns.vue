<template>
  <Head>
    <Title>My returns</Title>
  </Head>

  <div class="w-100">
    <Returns />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
