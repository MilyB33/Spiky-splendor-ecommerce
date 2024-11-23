import InvoiceService from "src/services/invoice";
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const idParam: string = req.params.id;

  const invoiceService: InvoiceService = req.scope.resolve("invoiceService");

  const invoice = await invoiceService.generateInvoice(idParam);

  res.json(invoice);
};
