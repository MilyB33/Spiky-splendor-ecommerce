import type { Region } from "@medusajs/medusa";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { LOCAL_STORAGE_KEY } from "~/constant";

export const useCommonStore = defineStore("common", () => {
  const selectedRegion = ref<Region | null>(null);
  const regionId = useLocalStorage<string | null>(LOCAL_STORAGE_KEY.REGION_ID, null);

  const selectRegion = (region: Region) => {
    selectedRegion.value = region;
    regionId.value = region.id;
  };

  function $reset() {
    selectedRegion.value = null;
    regionId.value = null;
  }

  return {
    selectedRegion,
    regionId,

    selectRegion,

    $reset,
  };
});
