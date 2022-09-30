import {MigrationInterface, QueryRunner} from "typeorm";

export class medicationAndAppointmentRelation1664428872418 implements MigrationInterface {
    name = 'medicationAndAppointmentRelation1664428872418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD CONSTRAINT "FK_a8a8669a831e3ac58c08d243fc0" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP CONSTRAINT "FK_a8a8669a831e3ac58c08d243fc0"`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP COLUMN "appointmentId"`);
    }

}
