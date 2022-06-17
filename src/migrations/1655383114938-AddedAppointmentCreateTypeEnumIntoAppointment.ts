import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedAppointmentCreateTypeEnumIntoAppointment1655383114938 implements MigrationInterface {
    name = 'AddedAppointmentCreateTypeEnumIntoAppointment1655383114938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_appointmentcreatetype_enum" AS ENUM('Appointment', 'Telehealth')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "appointmentCreateType" "public"."Appointments_appointmentcreatetype_enum" NOT NULL DEFAULT 'Appointment'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "appointmentCreateType"`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_appointmentcreatetype_enum"`);
    }

}
