import type { Region } from "@medusajs/medusa";
import { defineStore } from "pinia";
import type { RegionsListResponse } from "~/types";

export const useCommonStore = defineStore("common", () => {
  const isFetchingRegions = ref<boolean>(false);
  const regions = ref<RegionsListResponse | null>();
  const selectedRegion = ref<Region | null>(null);

  async function retrieveRegions() {
    try {
      isFetchingRegions.value = true;

      const client = useMedusaClient();

      const result = await client.regions.list();

      regions.value = result;
      selectedRegion.value = result.regions[0];
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingRegions.value = false;
    }
  }

  function $reset() {
    isFetchingRegions.value = false;
    regions.value = null;
    selectedRegion.value = null;
  }

  return {
    regions,
    selectedRegion,

    isFetchingRegions,

    retrieveRegions,

    $reset,
  };
});
