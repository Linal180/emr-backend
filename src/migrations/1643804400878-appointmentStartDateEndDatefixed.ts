import {MigrationInterface, QueryRunner} from "typeorm";

export class appointmentStartDateEndDatefixed1643804400878 implements MigrationInterface {
    name = 'appointmentStartDateEndDatefixed1643804400878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "startAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "endAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "scheduleStartDateTime" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "scheduleEndDateTime" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "scheduleEndDateTime" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "scheduleStartDateTime" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "endAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "startAt" SET DEFAULT now()`);
    }

}
