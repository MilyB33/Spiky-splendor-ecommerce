<template>
  <div class="d-flex flex-column ga-4">
    <h4 class="text-h4 text-green text-center">Recommended products</h4>
    <v-divider :thickness="3"></v-divider>
    <div class="d-flex ga-4 justify-center flex-wrap">
      <RecommendedProductCard
        v-for="item in recommendedProducts"
        :key="item.id"
        :product="item"
      />
    </div>

    <v-divider :thickness="3"></v-divider>
  </div>
</template>

<script lang="ts" setup>
const { recommendedProducts } = useLanding();
</script>
