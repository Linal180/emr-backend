import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelationShipInvoiceWithTransaction1647353981453 implements MigrationInterface {
    name = 'createRelationShipInvoiceWithTransaction1647353981453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "invoiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_67ffb74e58990494fd514842d73" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_67ffb74e58990494fd514842d73"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "invoiceId"`);
    }

}
