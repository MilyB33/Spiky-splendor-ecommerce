import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAllPlantRelatedTables1699999999999
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS "product_plant_placements_plant_placement" CASCADE`
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "product_plant_forms_plant_form" CASCADE`
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "plant_water_demand" CASCADE`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "plant_placement" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "plant_form" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
