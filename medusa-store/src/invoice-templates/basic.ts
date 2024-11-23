import { PDFSettings, DocumentSettings } from "./types";
import { Order, Store } from "@medusajs/medusa";
import {
  generateHeader,
  generateInvoiceInformation,
  generateCustomerInformation,
  generateInvoiceTable,
} from "./parts";
import { jsPDF } from "jspdf";
import { Invoice } from "src/models/invoice";

const PDF_SETTINGS: PDFSettings = {
  margin: { top: 15, right: 15, bottom: 15, left: 15 },
};

type GenerateInvoiceConfig = {
  order: Order;
  invoice: Invoice;
  settings: DocumentSettings;
};

export const generateInvoice = async ({
  order,
  invoice,
  settings,
}: GenerateInvoiceConfig) => {
  const doc = new jsPDF();

  await loadFont(doc);

  const headerHeight = generateHeader(doc, settings, PDF_SETTINGS);
  const endInvoiceInfo = generateInvoiceInformation(
    doc,
    headerHeight,
    invoice,
    order.display_id,
    PDF_SETTINGS
  );
  const endY = generateCustomerInformation(
    doc,
    endInvoiceInfo,
    order,
    PDF_SETTINGS
  );
  generateInvoiceTable(doc, endY, order, order.items);

  const pdfArrayBuffer = doc.output("arraybuffer");
  const buffer = Buffer.from(pdfArrayBuffer);
  const base64String = buffer.toString("base64");

  return base64String;
};

const loadFont = async (doc: jsPDF) => {
  const font = await fetch(
    "https://github.com/Hopding/pdf-lib/raw/master/assets/fonts/ubuntu/Ubuntu-R.ttf"
  ).then((res) => res.arrayBuffer());

  const buffer = Buffer.from(font);
  const base64Font = buffer.toString("base64");

  doc.addFileToVFS("MyFont.ttf", base64Font);
  doc.addFont("MyFont.ttf", "Regular", "normal");
  doc.setFont("Regular");
};
