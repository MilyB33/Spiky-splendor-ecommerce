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
      title: "Anuluj zwrot",
      key: "actions",
      fixed: true,
      align: "center",
    },
    {
      title: "Numer zwrotu",
      key: "id",
      align: "start",
    },
    {
      title: "Numer zamówienia",
      key: "order_id",
    },
    {
      title: "Liczba pozycji",
      key: "items_count",
    },
    {
      title: "Produkty",
      key: "items",
    },
    {
      title: "Kwota zwrotu",
      key: "refund",
    },
    {
      title: "Utworzono",
      key: "created_at",
    },
    {
      title: "Odebrano",
      key: "received_at",
    },
    {
      title: "Status",
      key: "status",
      align: "start",
    },
  ] as const;
};
