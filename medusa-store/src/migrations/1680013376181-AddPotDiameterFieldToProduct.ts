import { MigrationInterface, QueryRunner } from "typeorm";

class AddPotDiameterToProduct1680013376181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD COLUMN "pot_diameter" decimal`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pot_diameter"`);
  }
}

export default AddPotDiameterToProduct1680013376181;
