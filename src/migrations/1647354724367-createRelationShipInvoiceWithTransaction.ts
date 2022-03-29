import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelationShipInvoiceWithTransaction1647354724367 implements MigrationInterface {
    name = 'createRelationShipInvoiceWithTransaction1647354724367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_67ffb74e58990494fd514842d73"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "invoiceId"`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD "transctionId" uuid`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD CONSTRAINT "FK_7737a55f8f1e877aa457f25e2db" FOREIGN KEY ("transctionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" DROP CONSTRAINT "FK_7737a55f8f1e877aa457f25e2db"`);
        await queryRunner.query(`ALTER TABLE "Invoice" DROP COLUMN "transctionId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "invoiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_67ffb74e58990494fd514842d73" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
