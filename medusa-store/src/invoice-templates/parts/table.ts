import { LineItem, Order } from "@medusajs/medusa";
import { jsPDF } from "jspdf";
import autoTable, { type RowInput } from "jspdf-autotable";
import { getDecimalDigits } from "../utils";

const amountToDisplay = (amount: number, currencyCode: string): string => {
  const decimalDigits = getDecimalDigits(currencyCode);
  return `${(amount / Math.pow(10, decimalDigits)).toFixed(
    decimalDigits
  )} ${currencyCode.toUpperCase()}`;
};

export const generateInvoiceTable = (
  doc: jsPDF,
  y: number,
  order: Order,
  items: LineItem[]
) => {
  const data = formatDataForTable(order, items);
  const shippingAmount = amountToDisplay(
    order.shipping_total + order.shipping_total * 0.23,
    order.currency_code
  );
  const vat = amountToDisplay(order.tax_total || 0, order.currency_code);
  const orderTotal = amountToDisplay(order.total, order.currency_code);

  autoTable(doc, {
    head: [
      [
        { title: "Lp.", styles: { cellWidth: 15, lineWidth: { right: 0.5 } } },
        {
          title: "Nazwa",
          styles: { cellWidth: 70, lineWidth: { right: 0.5 } },
        },
        {
          title: "Cena jednostkowa (brutto)",
          styles: { cellWidth: 40, lineWidth: { right: 0.5 } },
        },
        {
          title: "Ilość",
          styles: { cellWidth: 15, lineWidth: { right: 0.5 } },
        },
        "Łączna wartość (brutto)",
      ],
    ],
    body: data,
    styles: { font: "Regular" },
    tableWidth: 188,
    foot: [
      [
        "",
        "",
        { content: "Dostawa", styles: { halign: "right" }, colSpan: 2 },
        { content: shippingAmount, styles: { halign: "right" } },
      ],
      [
        "",
        "",
        { content: "VAT", styles: { halign: "right" }, colSpan: 2 },
        { content: vat, styles: { halign: "right" } },
      ],
      [
        "",
        "",
        { content: "Łączna kwota", styles: { halign: "right" }, colSpan: 2 },
        { content: orderTotal, styles: { halign: "right" } },
      ],
    ],
    showFoot: "everyPage",
    theme: "grid",

    startY: y + 20,
  });
};

const formatDataForTable = (order: Order, items: LineItem[]) => {
  const formattedData: RowInput[] = items.map((item, index) => {
    // TODO: tutaj był bład ze dzielilem calosc przez item.quantity - dodaj do pracki jako testowanie
    const itemPrice = amountToDisplay(
      item.unit_price + item.tax_total / item.quantity || 0,
      order.currency_code
    );

    const itemTotal = amountToDisplay(item.total || 0, order.currency_code);

    return [
      { content: `${index}.`, styles: { halign: "right" } },
      item.title,
      { content: itemPrice, styles: { halign: "right" } },
      { content: String(item.quantity), styles: { halign: "right" } },
      { content: itemTotal, styles: { halign: "right" } },
    ];
  });

  return formattedData;
};
