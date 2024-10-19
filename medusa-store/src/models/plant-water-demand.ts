import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity, generateEntityId } from "@medusajs/medusa";

@Entity()
export class PlantWaterDemand extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  name: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "plant_water_demand");
  }
}
