import { TransactionBaseService, StoreService, Store } from "@medusajs/medusa";
import { generateInvoice } from "../invoice-templates/basic";
import { EntityManager } from "typeorm";
import { InvoiceRepository } from "src/repositories/invoice";
import { OrderRepository } from "@medusajs/medusa/dist/repositories/order";
import OrderService from "./order";

type InjectedDependencies = {
  manager: EntityManager;
  invoiceRepository: typeof InvoiceRepository;
  orderRepository: typeof OrderRepository;
  orderService: OrderService;
  storeService: StoreService;
};

class InvoiceService extends TransactionBaseService {
  protected readonly invoiceRepository_: typeof InvoiceRepository;
  protected readonly orderRepository_: typeof OrderRepository;
  protected readonly orderService_: OrderService;
  protected readonly storeService_: StoreService;

  constructor({
    orderRepository,
    invoiceRepository,
    orderService,
    storeService,
  }: InjectedDependencies) {
    super(arguments[0]);
    this.invoiceRepository_ = invoiceRepository;
    this.orderRepository_ = orderRepository;
    this.orderService_ = orderService;
    this.storeService_ = storeService;
  }

  async generateInvoice(orderId: string) {
    const order = await this.orderService_.retrieve(orderId, {
      relations: [
        "billing_address",
        "shipping_address",
        "items",
        "shipping_methods",
        "shipping_methods.shipping_option",
        "payments",
        "items.tax_lines",
        "items.adjustments",
        "shipping_methods.tax_lines",
        "fulfillments",
        "fulfillments.tracking_links",
        "invoice",
      ],
      select: [
        "id",
        "created_at",
        "currency_code",
        "display_id",
        "fulfillment_status",
        "id",
        "invoice",
        "tax_rate",
        "total",
        "tax_total",
        "shipping_total",
      ],
    });
    const store = await this.storeService_.retrieve();
    const settings = {
      store_address: {
        company: store.company || store.name || "",
        city: store.city || "",
        postal_code: store.postal_code || "",
        address: store.address || "",
      },
    };

    const buffer = await generateInvoice({
      order,
      invoice: order.invoice,
      settings,
    });

    return {
      buffer,
    };
  }

  async createInvoice(orderId: string) {
    const order = await this.orderService_.retrieve(orderId);

    const invoice = this.invoiceRepository_.create({
      order_id: order.id,
    });

    const savedInvoice = await this.invoiceRepository_.save(invoice);

    return savedInvoice;
  }
}

export default InvoiceService;
