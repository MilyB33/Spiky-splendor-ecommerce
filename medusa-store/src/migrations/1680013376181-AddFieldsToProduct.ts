import { MigrationInterface, QueryRunner } from "typeorm";

class AddFieldsToProduct1680013376181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD COLUMN "pot_diameter" decimal`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD COLUMN "plant_water_demand_id" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD COLUMN "min_height" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD COLUMN "max_height" integer`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pot_diameter"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "plant_water_demand_id"`
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "min_height"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "max_height"`);
  }
}

export default AddFieldsToProduct1680013376181;
