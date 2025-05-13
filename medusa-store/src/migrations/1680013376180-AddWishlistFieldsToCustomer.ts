import { MigrationInterface, QueryRunner } from "typeorm";

export class addWishlistIdToCustomer1680013376180
  implements MigrationInterface
{
  name = "addWishlistIdToCustomer1680013376180";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ADD COLUMN "wishlist_id" varchar`
    );

    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_customer_wishlist" FOREIGN KEY ("wishlist_id") REFERENCES "wishlist"("id") ON DELETE SET NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_customer_wishlist"`
    );

    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "wishlist_id"`);
  }
}
