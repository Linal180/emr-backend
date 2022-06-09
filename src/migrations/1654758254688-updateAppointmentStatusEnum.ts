import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAppointmentStatusEnum1654758254688 implements MigrationInterface {
    name = 'updateAppointmentStatusEnum1654758254688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum" RENAME TO "Appointments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum" AS ENUM('initiated', 'check_in', 'self_check_in', 'in_lobby', 'in_session', 'rescheduled', 'no_show', 'discharged', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum" USING "status"::"text"::"public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum_old" AS ENUM('no_show', 'initiated', 'checked_in', 'self_checked_in', 'in_lobby', 'in_session', 'completed', 'rescheduled', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum_old" USING "status"::"text"::"public"."Appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum_old" RENAME TO "Appointments_status_enum"`);
    }

}
