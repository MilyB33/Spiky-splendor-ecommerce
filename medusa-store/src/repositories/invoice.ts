import { Invoice } from "./../models/invoice";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const InvoiceRepository = dataSource.getRepository(Invoice);
