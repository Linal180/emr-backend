import {MigrationInterface, QueryRunner} from "typeorm";

export class addAppointmentRelationWithVaccine1664172027355 implements MigrationInterface {
    name = 'addAppointmentRelationWithVaccine1664172027355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Vaccine" DROP CONSTRAINT "FK_228c768416bc048780c569e60cf"`);
        await queryRunner.query(`ALTER TABLE "Vaccine" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Vaccine" ADD CONSTRAINT "FK_228c768416bc048780c569e60cf" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Vaccine" ADD CONSTRAINT "FK_9a4ad55661c7ade97850e2375b4" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Vaccine" DROP CONSTRAINT "FK_9a4ad55661c7ade97850e2375b4"`);
        await queryRunner.query(`ALTER TABLE "Vaccine" DROP CONSTRAINT "FK_228c768416bc048780c569e60cf"`);
        await queryRunner.query(`ALTER TABLE "Vaccine" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "Vaccine" ADD CONSTRAINT "FK_228c768416bc048780c569e60cf" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
