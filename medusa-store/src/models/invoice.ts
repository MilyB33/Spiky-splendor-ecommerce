import { BeforeInsert, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity, Order } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Invoice extends BaseEntity {
  readonly object = "invoice";

  @Column({ type: "varchar" })
  display_id: string;

  @Column({ type: "varchar" })
  order_id: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @BeforeInsert()
  private beforeInsert(): void {
    this.display_id = generateEntityId(this.id, "#");
    this.id = generateEntityId(this.id, "invoice");
  }
}
