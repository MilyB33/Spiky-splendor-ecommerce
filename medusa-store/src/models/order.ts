import { Entity, OneToOne } from "typeorm";
import { Order as MedusaOrder } from "@medusajs/medusa";
import { Invoice } from "./invoice";

@Entity()
export class Order extends MedusaOrder {
  @OneToOne(() => Invoice, (invoice) => invoice.order)
  invoice: Invoice;
}
