import { RETURN_STATUS_LABELS } from "./../../constant/";
import type { Return } from "@medusajs/medusa";
import { formatCurrency } from "../product";

export const prepareReturnsTableColumns = (returns: Return[], currencyCode?: string) => {
  return returns.map((ret) => ({
    id: ret.id,
    order_id: ret.order.display_id,
    status: RETURN_STATUS_LABELS[ret.status],
    return_status: ret.status,
    refund: formatCurrency(ret.refund_amount, currencyCode),
    items: ret.items,
    items_count: ret.items.length,
    created_at: ret.created_at,
    received_at: ret.received_at,
  }));
};

export const getReturnsTableColumnsHeaders = () => {
  return [
    {
      title: "Cancel return",
      key: "actions",
      fixed: true,
      align: "center",
    },
    {
      title: "Return number",
      key: "id",
      align: "start",
    },
    {
      title: "Order number",
      key: "order_id",
    },
    {
      title: "Number of items",
      key: "items_count",
    },
    {
      title: "Products",
      key: "items",
    },
    {
      title: "Refund amount",
      key: "refund",
    },
    {
      title: "Created",
      key: "created_at",
    },
    {
      title: "Received",
      key: "received_at",
    },
    {
      title: "Status",
      key: "status",
      align: "start",
    },
  ] as const;
};
