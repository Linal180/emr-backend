import {MigrationInterface, QueryRunner} from "typeorm";

export class associateInvoiceWithAppointment1648455761487 implements MigrationInterface {
    name = 'associateInvoiceWithAppointment1648455761487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "invoiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "UQ_aa3ab514cd938539a0ceb49c863" UNIQUE ("invoiceId")`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_aa3ab514cd938539a0ceb49c863" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_aa3ab514cd938539a0ceb49c863"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "UQ_aa3ab514cd938539a0ceb49c863"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "invoiceId"`);
    }

}
