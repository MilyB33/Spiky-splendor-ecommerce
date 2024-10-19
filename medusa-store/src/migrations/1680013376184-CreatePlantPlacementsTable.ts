import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlantPlacementsTable1680013376184
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "plant_placement" (
        "id" character varying NOT NULL PRIMARY KEY,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "name" character varying NOT NULL,
        "metadata" jsonb
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "plant_placement";
    `);
  }
}
