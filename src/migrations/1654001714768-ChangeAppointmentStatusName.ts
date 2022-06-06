import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAppointmentStatusName1654001714768 implements MigrationInterface {
    name = 'ChangeAppointmentStatusName1654001714768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum" RENAME TO "Appointments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum" AS ENUM('no_show', 'initiated', 'checked_in', 'self_checked_in', 'in_lobby', 'in_session', 'completed', 'rescheduled', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum" USING "status"::"text"::"public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum_old" AS ENUM('cancelled', 'initiated', 'completed', 'arrived', 'checked_in', 'checked_in_online', 'in_room', 'in_session', 'confirmed', 'not_confirmed', 'rescheduled', 'no_show')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum_old" USING "status"::"text"::"public"."Appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum_old" RENAME TO "Appointments_status_enum"`);
    }

}
