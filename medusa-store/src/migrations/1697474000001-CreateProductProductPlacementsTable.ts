import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductProductPlacementsTable1697474000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_plant_placements_plant_placement" (
        "product_id" character varying NOT NULL,
        "plant_placement_id" character varying NOT NULL,
        CONSTRAINT "PK_product_plant_placements_plant_placement" PRIMARY KEY ("product_id", "plant_placement_id")
      )`
    );

    await queryRunner.query(
      `ALTER TABLE "product_plant_placements_plant_placement" ADD CONSTRAINT "FK_product_plant_placements_plant_placement_product" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE`
    );

    await queryRunner.query(
      `ALTER TABLE "product_plant_placements_plant_placement" ADD CONSTRAINT "FK_product_plant_placements_plant_placement_plant_placement" FOREIGN KEY ("plant_placement_id") REFERENCES "plant_placement"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "product_plant_placements_plant_placement"`
    );
  }
}
