import {MigrationInterface, QueryRunner} from "typeorm";

export class bloodPressureFieldChangesInVitals1652262399831 implements MigrationInterface {
    name = 'bloodPressureFieldChangesInVitals1652262399831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP COLUMN "bloodPressure"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD "systolicBloodPressure" character varying`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD "diastolicBloodPressure" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP COLUMN "diastolicBloodPressure"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP COLUMN "systolicBloodPressure"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD "bloodPressure" character varying`);
    }

}
