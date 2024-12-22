import { API_QUERY_KEY, LOCAL_STORAGE_KEY, SETTINGS } from "~/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { Return } from "@medusajs/medusa";

type Params = {
  page: number;
  limit: number;
};

export const useReturns = () => {
  const queryClient = useQueryClient();
  const params = ref<Params>({
    page: 1,
    limit: SETTINGS.ORDERS_PAGE_LIMIT,
  });
  const pageCount = computed(() =>
    Math.ceil((returnsResponse.value?.count || 0) / SETTINGS.ORDERS_PAGE_LIMIT),
  );

  const client = useMedusaClient();

  const queryKey = computed(() => [API_QUERY_KEY.RETURNS, params.value.limit, params.value.page]);

  const {
    data: returnsResponse,
    isLoading: isLoadingReturns,
    isFetching: isFetchingReturns,
  } = useQuery({
    queryKey: queryKey,
    queryFn: (): Promise<{ returns: Return[]; count: number }> => {
      const limit = params.value.limit;
      const offset = (params.value.page - 1) * params.value.limit;
      return client.returns.client.request("GET", `/store/returns?limit=${limit}&offset=${offset}`);
    },
    // enabled: computed(() => !!customer.value?.customer.id).value,
  });

  const { mutateAsync: cancelReturn, isPending: isCancellingReturn } = useMutation({
    mutationFn: (returnId: string) =>
      client.client.request("POST", `/store/returns/${returnId}/cancel/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.RETURNS] });
    },
  });

  const returns = computed(() => returnsResponse.value?.returns || []);

  return {
    returns,
    isLoadingReturns,
    isFetchingReturns,
    isCancellingReturn,
    params,
    pageCount,
    cancelReturn,
  };
};
