import {MigrationInterface, QueryRunner} from "typeorm";

export class appointmentStartDateEndDate1643802299742 implements MigrationInterface {
    name = 'appointmentStartDateEndDate1643802299742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "startAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "endAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "endAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Schedules" ALTER COLUMN "startAt" DROP DEFAULT`);
    }

}
