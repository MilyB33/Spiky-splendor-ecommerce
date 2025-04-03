import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveWishlistIdFromCustomer1699999999999
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint if it exists
    await queryRunner.query(`
      ALTER TABLE "customer" DROP CONSTRAINT IF EXISTS "FK_customer_wishlist"
    `);

    // Drop the wishlist_id column
    await queryRunner.query(`
      ALTER TABLE "customer" DROP COLUMN IF EXISTS "wishlist_id"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add the wishlist_id column
    await queryRunner.query(`
      ALTER TABLE "customer" ADD COLUMN "wishlist_id" character varying
    `);

    // Re-add the foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "customer" ADD CONSTRAINT "FK_customer_wishlist" FOREIGN KEY ("wishlist_id") REFERENCES "wishlist"("id") ON DELETE CASCADE
    `);
  }
}
