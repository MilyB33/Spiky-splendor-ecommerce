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

  return { regions, isFetchingRegions, isSuccess };
};
