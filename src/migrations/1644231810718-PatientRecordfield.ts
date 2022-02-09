import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientRecordfield1644231810718 implements MigrationInterface {
    name = 'PatientRecordfield1644231810718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "patientRecord" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "patientRecord"`);
    }

}
