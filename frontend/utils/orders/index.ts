import { formatCurrency } from "../product";
import { ORDER_STATUS_LABELS } from "~/constant";
import { type Order } from "~/types";

export const prepareOrdersTableColumns = (orders: Order[], currencyCode?: string) => {
  return orders.map((order) => ({
    id: order.id,
    items: order.items,
    order_status: order.status,
    order_id: `#${order.display_id}`,
    created_at: new Date(order.created_at).toLocaleDateString("en-US"),
    total: formatCurrency(order.total, currencyCode),
    items_count: order.items.length,
    status: ORDER_STATUS_LABELS[order.status],
    returns: order.returns,
    fulfillments_status: order.fulfillment_status,
    payment_status: order.payment_status,
    invoice: order.invoice,
  }));
};

export const getOrdersTableColumnsHeaders = () => {
  return [
    {
      title: "Numer zamówienia",
      key: "order_id",
      align: "start",
    },
    {
      title: "Data zamówienia",
      key: "created_at",
      align: "start",
    },
    {
      title: "Łączna cena",
      key: "total",
      align: "end",
    },
    {
      title: "Liczba pozycji",
      key: "items_count",
      align: "end",
    },
    {
      title: "Status",
      key: "status",
      align: "start",
    },
    { title: "Akcje", key: "actions" },
  ] as const;
};
