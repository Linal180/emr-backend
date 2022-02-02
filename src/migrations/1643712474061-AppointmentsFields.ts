import {MigrationInterface, QueryRunner} from "typeorm";

export class AppointmentsFields1643712474061 implements MigrationInterface {
    name = 'AppointmentsFields1643712474061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "scheduleDateTime"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "scheduleStartDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "scheduleEndDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "scheduleEndDateTime"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "scheduleStartDateTime"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "scheduleDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
