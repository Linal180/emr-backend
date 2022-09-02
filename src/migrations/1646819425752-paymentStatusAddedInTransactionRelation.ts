import {MigrationInterface, QueryRunner} from "typeorm";

export class paymentStatusAddedInTransactionRelation1646819425752 implements MigrationInterface {
    name = 'paymentStatusAddedInTransactionRelation1646819425752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Transactions_status_enum" AS ENUM('refund', 'due', 'paid')`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "status" "public"."Transactions_status_enum" NOT NULL DEFAULT 'due'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."Transactions_status_enum"`);
    }

}
