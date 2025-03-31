import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";
import { PlantForm } from "./plant-form";
import { WaterDemand, PlantPlacement } from "../types/product";

@Entity()
export class Product extends MedusaProduct {
  @Column({ type: "decimal", nullable: true })
  pot_diameter: number;

  @Column({ type: "integer", nullable: true })
  min_height: number;

  @Column({ type: "integer", nullable: true })
  max_height: number;

  @ManyToMany(() => PlantForm, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "product_plant_forms_plant_form",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "plant_form_id",
      referencedColumnName: "id",
    },
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
