import { API_QUERY_KEY, LOCAL_STORAGE_KEY, SETTINGS } from "~/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { useStorage } from "@vueuse/core";

type Params = {
  page: number;
  limit: number;
};

export const useOrders = () => {
  const queryClient = useQueryClient();
  const params = ref<Params>({
    page: 1,
    limit: SETTINGS.ORDERS_PAGE_LIMIT,
  });
  const pageCount = computed(() =>
    Math.ceil((orders.value?.count || 0) / SETTINGS.ORDERS_PAGE_LIMIT),
  );
  const localStorageLastOrderId = useStorage(LOCAL_STORAGE_KEY.LAST_ORDER_ID, "");
  const { customer } = useCustomer();

  const client = useMedusaClient();

  const queryKey = computed(() => [API_QUERY_KEY.ORDERS, params.value.limit, params.value.page]);

  const {
    data: orders,
    isLoading: isLoadingOrders,
    isFetching: isFetchingOrders,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      client.customers.listOrders({
        limit: params.value.limit,
        offset: (params.value.page - 1) * params.value.limit,
        expand: "returns,invoice",
      }),
    enabled: computed(() => !!customer.value?.customer.id).value,
  });

  const { data: lastOrder, isLoading: isFetchingLastOrder } = useQuery({
    queryKey: [API_QUERY_KEY.ORDERS, localStorageLastOrderId.value],
    queryFn: () => client.orders.retrieve(localStorageLastOrderId.value),
    enabled: computed(() => !!localStorageLastOrderId.value).value,
  });

  const { mutateAsync: cancelOrder, isPending: isCancellingOrder } = useMutation({
    mutationFn: (orderId: string) =>
      client.client.request("POST", `/store/orders/${orderId}/cancel/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.ORDERS] });
    },
  });

  const { mutateAsync: generateInvoice, isPending: isGeneratingInvoice } = useMutation({
    mutationFn: (orderId: string) =>
      client.client.request("GET", `/store/orders/${orderId}/invoice/`),
    onSuccess: (response) => {
      const pdfBuffer = Buffer.from(response.buffer, "base64");

      const pdfBytes = new Uint8Array(pdfBuffer);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      // Open the blob URL in a new tab
      window.open(blobUrl, "_blank");
    },
  });

  const setOrderId = (orderID: string) => {
    localStorageLastOrderId.value = orderID;
  };

  return {
    lastOrder,
    isFetchingLastOrder,
    setOrderId,
    orders,
    isLoadingOrders,
    isFetchingOrders,
    params,
    pageCount,
    cancelOrder,
    isCancellingOrder,
    generateInvoice,
    isGeneratingInvoice,
  };
};
