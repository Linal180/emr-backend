import {MigrationInterface, QueryRunner} from "typeorm";

export class eagerInvoiceWithAppointment1648466472421 implements MigrationInterface {
    name = 'eagerInvoiceWithAppointment1648466472421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_aa3ab514cd938539a0ceb49c863"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "UQ_aa3ab514cd938539a0ceb49c863"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "invoiceId"`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD CONSTRAINT "UQ_999be668c3bc4009f5667ed748b" UNIQUE ("appointmentId")`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD CONSTRAINT "FK_999be668c3bc4009f5667ed748b" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" DROP CONSTRAINT "FK_999be668c3bc4009f5667ed748b"`);
        await queryRunner.query(`ALTER TABLE "Invoice" DROP CONSTRAINT "UQ_999be668c3bc4009f5667ed748b"`);
        await queryRunner.query(`ALTER TABLE "Invoice" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "invoiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "UQ_aa3ab514cd938539a0ceb49c863" UNIQUE ("invoiceId")`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_aa3ab514cd938539a0ceb49c863" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
