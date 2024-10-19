import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";
import { PlantForm } from "./plant-form";
import { PlantPlacement } from "./plant-placement";
import { PlantWaterDemand } from "./plant-water-demand";

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

  @ManyToMany(() => PlantPlacement, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "product_plant_placements_plant_placement",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "plant_placement_id",
      referencedColumnName: "id",
    },
  })
  plant_placements: PlantPlacement[];

  @Column({ type: "varchar", nullable: true })
  plant_water_demand_id: string;

  @ManyToOne(() => PlantWaterDemand, {
    cascade: true,
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "plant_water_demand_id" })
  plant_water_demand: PlantWaterDemand;
}
