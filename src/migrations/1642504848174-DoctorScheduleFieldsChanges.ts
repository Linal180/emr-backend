import {MigrationInterface, QueryRunner} from "typeorm";

export class DoctorScheduleFieldsChanges1642504848174 implements MigrationInterface {
    name = 'DoctorScheduleFieldsChanges1642504848174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Schedules" ALTER COLUMN "recurringEndDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Schedules" ALTER COLUMN "recurringEndDate" SET NOT NULL`);
    }

}
