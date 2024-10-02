import { API_QUERY_KEY, LOCAL_STORAGE_KEY } from "~/constant";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { useStorage } from "@vueuse/core";

export const useOrders = () => {
  const localStorageLastOrderId = useStorage(LOCAL_STORAGE_KEY.LAST_ORDER_ID, "");

  const client = useMedusaClient();

  const { data: lastOrder, isPending: isFetchingLastOrder } = useQuery({
    queryKey: [API_QUERY_KEY.ORDERS, localStorageLastOrderId.value],
    queryFn: () => client.orders.retrieve(localStorageLastOrderId.value),
    enabled: computed(() => !!localStorageLastOrderId.value).value,
  });

  const setOrderId = (orderID: string) => {
    localStorageLastOrderId.value = orderID;
  };

  return {
    lastOrder,
    isFetchingLastOrder,
    setOrderId,
  };
};
