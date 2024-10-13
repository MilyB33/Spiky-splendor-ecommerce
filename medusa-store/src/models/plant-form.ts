import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { BaseEntity, generateEntityId } from "@medusajs/medusa";

@Entity()
export class PlantForm extends BaseEntity {
  readonly object = "plant_form";

  @Column({ type: "varchar", nullable: false })
  name: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "plant_form");
  }
}
