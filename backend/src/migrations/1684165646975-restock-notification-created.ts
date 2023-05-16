import { MigrationInterface, QueryRunner } from "typeorm";

export class RestockNotificationCreated1684165646975
  implements MigrationInterface
{
  name = "RestockNotificationCreated1684165646975";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "restock_notification" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "variant_id" character varying NOT NULL, "emails" jsonb NOT NULL, CONSTRAINT "PK_23f313df3a6c4d115e52c170177" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49181ca04caac807fcec321705" ON "restock_notification" ("variant_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "restock_notification" ADD CONSTRAINT "FK_49181ca04caac807fcec321705a" FOREIGN KEY ("variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restock_notification" DROP CONSTRAINT "FK_49181ca04caac807fcec321705a"`
    );
    await queryRunner.query(`DROP INDEX "IDX_49181ca04caac807fcec321705"`);
    await queryRunner.query(`DROP TABLE "restock_notification"`);
  }
}
