import { Entity, Column } from "typeorm";
import { Product as MedusaCustomer } from "@medusajs/medusa";

@Entity()
export class Product extends MedusaCustomer {
  @Column({ type: "decimal", nullable: true })
  pot_diameter: number;
}
