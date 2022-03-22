import {MigrationInterface, QueryRunner} from "typeorm";

export class addInvoiceNoInInoviceTable1647495986062 implements MigrationInterface {
    name = 'addInvoiceNoInInoviceTable1647495986062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ADD "invoiceNo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" DROP COLUMN "invoiceNo"`);
    }

}
