import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlantPlacementEnumArray1680013376188
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "plant_placements_enum" AS ENUM(
        'Indoor Table', 'Indoor Shelf', 'Indoor Hanging', 'Indoor Corner', 'Indoor Window',
        'Outdoor Garden Bed', 'Outdoor Pot', 'Outdoor Hanging', 'Outdoor Balcony', 'Outdoor Fence'
      )`
    );

    await queryRunner.query(
      `ALTER TABLE "product" ADD "plant_placements" "plant_placements_enum"[]`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "plant_placements"`
    );

    await queryRunner.query(`DROP TYPE "plant_placements_enum"`);
  }
}
