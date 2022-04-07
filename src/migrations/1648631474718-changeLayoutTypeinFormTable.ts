import {MigrationInterface, QueryRunner} from "typeorm";

export class changeLayoutTypeinFormTable1648631474718 implements MigrationInterface {
    name = 'changeLayoutTypeinFormTable1648631474718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum" RENAME TO "Appointments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum" AS ENUM('cancelled', 'initiated', 'completed')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum" USING "status"::"text"::"public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_billingstatus_enum" RENAME TO "Appointments_billingstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_billingstatus_enum" AS ENUM('paid', 'due')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" TYPE "public"."Appointments_billingstatus_enum" USING "billingStatus"::"text"::"public"."Appointments_billingstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" SET DEFAULT 'due'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_billingstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Forms" DROP COLUMN "layout"`);
        await queryRunner.query(`ALTER TABLE "Forms" ADD "layout" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" DROP COLUMN "layout"`);
        await queryRunner.query(`ALTER TABLE "Forms" ADD "layout" text NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_billingstatus_enum_old" AS ENUM('due', 'paid', 'refund')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" TYPE "public"."Appointments_billingstatus_enum_old" USING "billingStatus"::"text"::"public"."Appointments_billingstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" SET DEFAULT 'due'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_billingstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_billingstatus_enum_old" RENAME TO "Appointments_billingstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum_old" AS ENUM('arrived', 'cancelled', 'checked_in', 'checked_in_online', 'completed', 'confirmed', 'in_room', 'in_session', 'initiated', 'no_show', 'not_confirmed', 'rescheduled')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum_old" USING "status"::"text"::"public"."Appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum_old" RENAME TO "Appointments_status_enum"`);
    }

}
