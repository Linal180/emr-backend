import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTransactionIdInInvoiceTable1648194588667 implements MigrationInterface {
    name = 'changeTransactionIdInInvoiceTable1648194588667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "transactionId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "transactionId" SET NOT NULL`);
    }

}
