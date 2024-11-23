import { jsPDF } from "jspdf";
import { PDFSettings, DocumentSettings } from "../types";

export function generateHeader(
  doc: jsPDF,
  documentSettings: DocumentSettings,
  pdfSettings: PDFSettings
): number {
  // Add company name
  doc
    .setFillColor("#4444444")
    .setFontSize(20)
    .text(
      documentSettings.store_address.company,
      pdfSettings.margin.left,
      pdfSettings.margin.top,
      {
        align: "left",
        maxWidth: 100,
      }
    );

  const heightCompany = doc.getTextDimensions(
    documentSettings.store_address.company
  ).h;

  // Add company info
  doc
    .setFontSize(10)
    .text(documentSettings.store_address.company, 200, pdfSettings.margin.top, {
      align: "right",
    })
    .text(
      `${documentSettings.store_address.city} ${documentSettings.store_address.postal_code}`,
      200,
      pdfSettings.margin.top + 6,
      { align: "right" }
    )
    .text(
      `${documentSettings.store_address.address}`,
      200,
      pdfSettings.margin.top + 12,
      {
        align: "right",
        maxWidth: 150,
      }
    );

  const heightAddress = doc.getTextDimensions(
    documentSettings.store_address.address
  ).h;

  if (heightCompany > heightAddress + 30) {
    return heightCompany + pdfSettings.margin.top;
  } else {
    return heightAddress + pdfSettings.margin.top + 30;
  }
}
