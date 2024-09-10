import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Customer as MedusaCustomer } from "@medusajs/medusa/dist/models/customer";
import { Wishlist } from "./wishlist";

@Entity()
export class Customer extends MedusaCustomer {
  @Column({ type: "varchar", nullable: true })
  wishlist_id: string;

  @OneToOne(() => Wishlist, {
    cascade: true, // Automatically handle saving/removing the related wishlist
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "wishlist_id" }) // Establish the link between Customer and Wishlist using wishlist_id
  wishlist: Wishlist;
}
