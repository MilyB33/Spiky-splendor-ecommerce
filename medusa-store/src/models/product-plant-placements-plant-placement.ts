import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "@medusajs/medusa";
import { PlantPlacement } from "./plant-placement";

// TODO: Probably not needed as we can add test data in other ways
@Entity({ name: "product_plant_placements_plant_placement" })
export class ProductPlantPlacementsPlantPlacement {
  @PrimaryColumn({ type: "varchar", nullable: false, name: "product_id" })
  product_id: string;

  @PrimaryColumn({
    type: "varchar",
    nullable: false,
    name: "plant_placement_id",
  })
  plant_placement_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => PlantPlacement)
  @JoinColumn({ name: "plant_placement_id" })
  plant_placement: PlantPlacement;
}
