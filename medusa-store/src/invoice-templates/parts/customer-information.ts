import { jsPDF } from "jspdf";
import { Order } from "@medusajs/medusa";
import { PDFSettings } from "../types";

export const generateCustomerInformation = (
  doc: jsPDF,
  y: number,
  order: Order,
  pdfSettings: PDFSettings
) => {
  doc
    .setFillColor("#444444")
    .setFontSize(20)
    .text("Szczegóły", pdfSettings.margin.left, y + 20);

  doc.line(pdfSettings.margin.left, y + 22, 200, y + 22);

  const customerInformationTop = y + 30;

  doc
    .setFontSize(10)
    .text("Nabywca:", pdfSettings.margin.left, customerInformationTop, {
      align: "left",
    })
    .text(
      `${order.billing_address.first_name} ${order.billing_address.last_name}`,
      pdfSettings.margin.left,
      customerInformationTop + 6,
      { align: "left" }
    )
    .text(
      `${order.billing_address.city} ${order.billing_address.postal_code}`,
      pdfSettings.margin.left,
      customerInformationTop + 12,
      { align: "left" }
    );
  const billAddress = order.billing_address.address_1 || "";

  doc.text(billAddress, pdfSettings.margin.left, customerInformationTop + 18, {
    align: "left",
    maxWidth: 50,
  });

  const heightOfBillToAddress = doc.getTextDimensions(billAddress, {
    maxWidth: 50,
  }).h;

  doc
    .setFontSize(10)
    .text("Odbiorca:", 200, customerInformationTop, {
      align: "right",
    })
    .text(
      `${order.shipping_address.first_name} ${order.shipping_address.last_name}`,
      200,
      customerInformationTop + 6,
      { align: "right" }
    )
    .text(
      `${order.shipping_address.city} ${order.shipping_address.postal_code}`,
      200,
      customerInformationTop + 12,
      { align: "right" }
    );

  const shipAddress = order.shipping_address.address_1 || "";

  doc.text(shipAddress, 200, customerInformationTop + 18, {
    align: "right",
    maxWidth: 50,
  });

  const heightOfShipToAddress = doc.getTextDimensions(shipAddress, {
    maxWidth: 50,
  }).h;

  if (heightOfShipToAddress > heightOfBillToAddress) {
    return customerInformationTop + 18 + heightOfShipToAddress;
  } else {
    return customerInformationTop + 18 + heightOfBillToAddress;
  }
};
