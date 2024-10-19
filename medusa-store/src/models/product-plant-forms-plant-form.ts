import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "@medusajs/medusa";
import { PlantForm } from "./plant-form";

@Entity({ name: "product_plant_forms_plant_form" })
export class ProductPlantFormsPlantForm {
  @PrimaryColumn({ type: "varchar", nullable: false, name: "product_id" })
  product_id: string;

  @PrimaryColumn({ type: "varchar", nullable: false, name: "plant_form_id" })
  plant_form_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => PlantForm)
  @JoinColumn({ name: "plant_form_id" })
  plant_form: PlantForm;
}
