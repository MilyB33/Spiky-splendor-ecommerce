import {
  OrderService,
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/medusa";
import InvoiceService from "src/services/invoice";

export default async function createInvoice({
  data,
  container,
}: SubscriberArgs) {
  const invoiceService: InvoiceService = container.resolve("invoiceService");

  const { id } = data as { id: string };

  await invoiceService.createInvoice(id);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PAYMENT_CAPTURED,
};
