import { MigrationInterface, QueryRunner } from "typeorm";

export class ReplaceFkWithEnumForWaterDemand1680013376187
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "water_demand_enum" AS ENUM('small', 'medium', 'large')`
    );

    await queryRunner.query(
      `ALTER TABLE "product" ADD "water_demand" "water_demand_enum"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "water_demand"`);

    await queryRunner.query(`DROP TYPE "water_demand_enum"`);
  }
}
