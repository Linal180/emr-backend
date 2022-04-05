import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnNameInInvoiceTable1647424923454 implements MigrationInterface {
    name = 'changeColumnNameInInvoiceTable1647424923454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" RENAME COLUMN "transactionId" TO "paymentTransactionId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" RENAME COLUMN "paymentTransactionId" TO "transactionId"`);
    }

}
