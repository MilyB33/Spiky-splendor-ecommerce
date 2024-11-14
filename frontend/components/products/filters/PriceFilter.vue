<template>
  <div
    class="d-flex flex-column ga-4 w-100"
    style="width: fit-content"
  >
    <p class="text-h6">Cena</p>

    <div class="d-flex align-center justify-space-between">
      <v-text-field
        v-model="minPrice"
        type="number"
        max-width="100"
        hide-details
        variant="outlined"
      />

      <span> - </span>

      <v-text-field
        v-model="maxPrice"
        type="number"
        max-width="100"
        hide-details
        variant="outlined"
      />
    </div>
    <span
      class="text-subtitle-2 text-error"
      v-if="minPriceError || maxPriceError"
      >{{ minPriceError || maxPriceError }}</span
    >
  </div>
</template>

<script lang="ts" setup>
const { value: minPrice, errorMessage: minPriceError } = useField<number>("minPrice");
const { value: maxPrice, errorMessage: maxPriceError } = useField<number>("maxPrice");
</script>
