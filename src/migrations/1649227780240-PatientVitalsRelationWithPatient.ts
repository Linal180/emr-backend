import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientVitalsRelationWithPatient1649227780240 implements MigrationInterface {
    name = 'PatientVitalsRelationWithPatient1649227780240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD CONSTRAINT "FK_9da7fc1d0adb9544ef9bf09b59e" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP CONSTRAINT "FK_9da7fc1d0adb9544ef9bf09b59e"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP COLUMN "patientId"`);
    }

}
