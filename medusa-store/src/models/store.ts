import { Entity, Column } from "typeorm";
import { Store as MedusaStore } from "@medusajs/medusa";

@Entity()
export class Store extends MedusaStore {
  @Column({ type: "varchar", nullable: true })
  company: string;

  @Column({ type: "varchar", nullable: true })
  city: string;

  @Column({ type: "varchar", nullable: true })
  postal_code: string;

  @Column({ type: "varchar", nullable: true })
  address: string;
}
