import {MigrationInterface, QueryRunner} from "typeorm";

export class appointmentStatusEnum1646822436543 implements MigrationInterface {
    name = 'appointmentStatusEnum1646822436543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum" RENAME TO "Appointments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum" AS ENUM('cancelled', 'initiated', 'completed')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum" USING "status"::"text"::"public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum_old" AS ENUM('cancelled', 'initiated')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum_old" USING "status"::"text"::"public"."Appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum_old" RENAME TO "Appointments_status_enum"`);
    }

}
