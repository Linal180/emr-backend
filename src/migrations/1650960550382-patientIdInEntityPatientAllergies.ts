import {MigrationInterface, QueryRunner} from "typeorm";

export class patientIdInEntityPatientAllergies1650960550382 implements MigrationInterface {
    name = 'patientIdInEntityPatientAllergies1650960550382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" ADD "day" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" DROP COLUMN "day"`);
    }

}
