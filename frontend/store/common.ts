import type { Region } from "@medusajs/medusa";
import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", () => {
  const selectedRegion = ref<Region | null>(null);

  const selectRegion = (region: Region) => {
    selectedRegion.value = region;
  };

  function $reset() {
    selectedRegion.value = null;
  }

  return {
    selectedRegion,

    selectRegion,

    $reset,
  };
});
