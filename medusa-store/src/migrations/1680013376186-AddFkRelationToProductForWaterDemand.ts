import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFkRelationToProductForWaterDemand1680013376186
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_plant_water_demand" FOREIGN KEY ("plant_water_demand_id") REFERENCES "plant_water_demand"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_plant_water_demand"`
    );
  }
}
