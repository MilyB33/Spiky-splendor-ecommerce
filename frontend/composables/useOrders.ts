import { API_QUERY_KEY, SETTINGS } from "~/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

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

  const { customer, isFetchingCustomer } = useCustomer();

  const client = useMedusaClient();

  const queryKey = computed(() => [API_QUERY_KEY.ORDERS, params.value.limit, params.value.page]);

  const isListOrdersEnabled = computed(() => () => !!customer.value?.customer.id);
  const shouldFetchLastOrder = ref(false);
  const cartId = ref("");

  const lastOrderEnabled = computed(
    () => shouldFetchLastOrder.value && !isFetchingCustomer.value && !!cartId.value,
  );

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
    enabled: isListOrdersEnabled,
  });

  const { data: cartForOrder, isFetching: isFetchingCartForOrder } = useQuery({
    queryKey: [API_QUERY_KEY.CART_ORDER],
    queryFn: () => client.carts.retrieve(cartId.value),
    enabled: computed(() => !!cartId.value),
  });

  const { data: lastOrderResponse, isLoading: isLoadingLastOrder } = useQuery({
    queryKey: [API_QUERY_KEY.LAST_ORDER],
    queryFn: () => client.orders.retrieveByCartId(cartId.value),
    enabled: lastOrderEnabled,
  });

  const { mutateAsync: cancelOrder, isPending: isCancellingOrder } = useMutation({
    mutationFn: (orderId: string) =>
      client.client.request("POST", `/store/orders/${orderId}/cancel/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.ORDERS] });
    },
  });

  const { mutate: generateInvoice, isPending: isGeneratingInvoice } = useMutation({
    mutationFn: (orderId: string) =>
      client.client.request("GET", `/store/orders/${orderId}/invoice/`),
    onSuccess: (response) => {
      const pdfBuffer = Buffer.from(response.buffer, "base64");

      const pdfBytes = new Uint8Array(pdfBuffer);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    },
  });

  const lastOrder = computed(() => lastOrderResponse.value?.order);

  return {
    lastOrder,
    cartForOrder,
    isFetchingCartForOrder,
    isLoadingLastOrder,
    orders,
    isLoadingOrders,
    isFetchingOrders,
    params,
    pageCount,
    cancelOrder,
    isCancellingOrder,
    generateInvoice,
    isGeneratingInvoice,
    shouldFetchLastOrder,
    cartId,
  };
};
