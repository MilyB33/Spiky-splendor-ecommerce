import { MigrationInterface, QueryRunner } from "typeorm";

export class addWishlistIdToCustomer1680013376180
  implements MigrationInterface
{
  name = "addWishlistIdToCustomer1680013376180";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add wishlist_id column to customer table
    await queryRunner.query(
      `ALTER TABLE "customer" ADD COLUMN "wishlist_id" varchar`
    );

    // Create foreign key relationship between customer and wishlist
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_customer_wishlist" FOREIGN KEY ("wishlist_id") REFERENCES "wishlist"("id") ON DELETE SET NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraint from customer table
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_customer_wishlist"`
    );

    // Remove wishlist_id column from customer table
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "wishlist_id"`);
  }
}
