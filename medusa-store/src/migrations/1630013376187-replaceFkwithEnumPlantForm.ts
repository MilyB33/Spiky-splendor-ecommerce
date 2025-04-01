import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlantFormsEnumArray1680013376187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "plant_forms_enum" AS ENUM(
          'Tree', 'Shrub', 'Vine', 'Herb', 'Grass', 'Fern', 'Succulent'
        )`
    );

    await queryRunner.query(
      `ALTER TABLE "product" ADD "plant_forms" "plant_forms_enum"[]`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "plant_forms"`);

    await queryRunner.query(`DROP TYPE "plant_forms_enum"`);
  }
}
