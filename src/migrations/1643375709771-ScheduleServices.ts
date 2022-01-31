import {MigrationInterface, QueryRunner} from "typeorm";

export class ScheduleServices1643375709771 implements MigrationInterface {
    name = 'ScheduleServices1643375709771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_48a9181c2205da141675124038e"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP CONSTRAINT "FK_fccafb49e66a53e21d0156239dc"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD "serviceId" character varying`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP COLUMN "scheduleId"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD "scheduleId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP COLUMN "scheduleId"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD "scheduleId" uuid`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD "serviceId" uuid`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_fccafb49e66a53e21d0156239dc" FOREIGN KEY ("scheduleId") REFERENCES "Schedules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ScheduleServices" ADD CONSTRAINT "FK_48a9181c2205da141675124038e" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
