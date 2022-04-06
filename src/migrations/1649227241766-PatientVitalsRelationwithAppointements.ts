import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientVitalsRelationwithAppointements1649227241766 implements MigrationInterface {
    name = 'PatientVitalsRelationwithAppointements1649227241766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD CONSTRAINT "FK_8024a70f8dbce70d95454a2e4cb" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP CONSTRAINT "FK_8024a70f8dbce70d95454a2e4cb"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP COLUMN "appointmentId"`);
    }

}
