import {MigrationInterface, QueryRunner} from "typeorm";

export class AppointmentCancelReason1643788897597 implements MigrationInterface {
    name = 'AppointmentCancelReason1643788897597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum" AS ENUM('cancelled', 'initiated')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "status" "public"."Appointments_status_enum" NOT NULL DEFAULT 'initiated'`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "appointmentCancelReason" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "appointmentCancelReason"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum"`);
    }

}
