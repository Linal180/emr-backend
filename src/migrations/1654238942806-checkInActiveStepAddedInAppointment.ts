import {MigrationInterface, QueryRunner} from "typeorm";

export class checkInActiveStepAddedInAppointment1654238942806 implements MigrationInterface {
    name = 'checkInActiveStepAddedInAppointment1654238942806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "checkInActiveStep" character varying DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "checkInActiveStep"`);
    }

}
