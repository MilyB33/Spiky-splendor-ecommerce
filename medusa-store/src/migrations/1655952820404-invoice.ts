import { MigrationInterface, QueryRunner } from "typeorm";

export class invoice1655952820404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice" ( "id" character varying NOT NULL, "display_id" character varying, "order_id" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_invoice_id" PRIMARY KEY ("id") )`
    );

    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_invoice_order" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoice"`);

    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_invoice_order"`
    );
  }
}
