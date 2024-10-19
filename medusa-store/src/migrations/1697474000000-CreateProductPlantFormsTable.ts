import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductPlantFormsTable1697474000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_plant_forms_plant_form" (
        "product_id" character varying NOT NULL,
        "plant_form_id" character varying NOT NULL,
        CONSTRAINT "PK_product_plant_forms_plant_form" PRIMARY KEY ("product_id", "plant_form_id")
      )`
    );

    await queryRunner.query(
      `ALTER TABLE "product_plant_forms_plant_form" ADD CONSTRAINT "FK_product_plant_forms_plant_form_product" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE`
    );

    await queryRunner.query(
      `ALTER TABLE "product_plant_forms_plant_form" ADD CONSTRAINT "FK_product_plant_forms_plant_form_plant_form" FOREIGN KEY ("plant_form_id") REFERENCES "plant_form"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_plant_forms_plant_form"`);
  }
}
