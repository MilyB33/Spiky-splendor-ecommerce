import { jsPDF } from "jspdf";
import { PDFSettings } from "../types";
import { Invoice } from "src/models/invoice";

export const generateInvoiceInformation = (
  doc: jsPDF,
  y: number,
  invoice: Invoice,
  orderDisplayNumber: number,
  pdfSettings: PDFSettings
) => {
  doc
    .setFillColor("#444444")
    .setFontSize(20)
    .text("Invoice", pdfSettings.margin.left, y + 10);

  doc.line(pdfSettings.margin.left, y + 12, 200, y + 12);

  const invoiceInformationTop = y + 20;

  doc
    .setFontSize(10)
    .text("number:", pdfSettings.margin.left, invoiceInformationTop)
    .text(
      invoice.display_id,
      pdfSettings.margin.left + 50,
      invoiceInformationTop
    )
    .text("Date of issue:", pdfSettings.margin.left, invoiceInformationTop + 6)
    .text(
      invoice.created_at.toLocaleDateString(),
      pdfSettings.margin.left + 50,
      invoiceInformationTop + 6
    )
    .text("Order:", pdfSettings.margin.left, invoiceInformationTop + 12)
    .text(
      `#${orderDisplayNumber}`,
      pdfSettings.margin.left + 50,
      invoiceInformationTop + 12
    );

  return invoiceInformationTop + 12;
};
