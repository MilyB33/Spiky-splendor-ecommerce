import { useMutation } from "@tanstack/vue-query";
import PDFDocument from "pdfkit";

export const useInvoices = () => {
  const client = useMedusaClient();

  const generateInvoice = async () => {
    const doc = new PDFDocument();
    doc.font("Courier");

    const buffers: Buffer[] = [];
    doc.on("data", buffers.push.bind(buffers));

    doc.text("Cześć");

    doc.end();

    const bufferPromise = new Promise<string>((resolve) => {
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        const buffer = Buffer.from(pdfData);
        const base64String = buffer.toString("base64");
        resolve(base64String);
      });
    });

    const buffer_ = await bufferPromise;

    const pdfBuffer = Buffer.from(buffer_, "base64");

    const pdfBytes = new Uint8Array(pdfBuffer);

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    // Open the blob URL in a new tab
    window.open(blobUrl, "_blank");
  };

  return { generateInvoice, isGeneratingInvoice: false };
};
