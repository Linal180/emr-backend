import {MigrationInterface, QueryRunner} from "typeorm";

export class pulseRateInPatientVitals1652087696240 implements MigrationInterface {
    name = 'pulseRateInPatientVitals1652087696240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD "pulseRate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP COLUMN "pulseRate"`);
    }

}
