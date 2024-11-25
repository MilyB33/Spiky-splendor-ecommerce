import { useQuery } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

export const useRegions = () => {
  const client = useMedusaClient();

  const {
    data: regions,
    isPending: isFetchingRegions,
    isSuccess,
  } = useQuery({
    queryKey: [API_QUERY_KEY.REGIONS],
    queryFn: () => client.regions.list(),
  });

  // There should only one region
  const region = computed(() => regions.value?.regions[0]);

  return { availableRegions: regions, region, isFetchingRegions, isSuccess };
};
