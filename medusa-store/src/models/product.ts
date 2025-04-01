import { Entity, Column } from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";
import { WaterDemand, PlantPlacement, PlantForm } from "../types/product";

@Entity()
export class Product extends MedusaProduct {
  @Column({ type: "decimal", nullable: true })
  pot_diameter: number;

  @Column({ type: "integer", nullable: true })
  min_height: number;

  @Column({ type: "integer", nullable: true })
  max_height: number;

  @Column({
    type: "enum",
    enum: PlantForm,
    enumName: "plant_forms_enum",
    nullable: true,
    array: true,
  })
  plant_forms: PlantForm[];

  @Column({
    type: "enum",
    enum: PlantPlacement,
    enumName: "plant_placements_enum",
    nullable: true,
    array: true,
  })
  plant_placements: PlantPlacement[];

  @Column({
    type: "enum",
    enum: WaterDemand,
    nullable: true,
  })
  water_demand: WaterDemand;
}
