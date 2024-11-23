import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsToStore1680013376185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store" 
      ADD COLUMN "company" character varying,
      ADD COLUMN "city" character varying,
      ADD COLUMN "postal_code" character varying,
      ADD COLUMN "address" character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store" 
      DROP COLUMN "company",
      DROP COLUMN "city",
      DROP COLUMN "postal_code",
      DROP COLUMN "address";
    `);
  }
}
