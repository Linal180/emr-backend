import {MigrationInterface, QueryRunner} from "typeorm";

export class changes1649226359617 implements MigrationInterface {
    name = 'changes1649226359617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum" RENAME TO "Appointments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum" AS ENUM('cancelled', 'initiated', 'completed', 'arrived', 'checked_in', 'checked_in_online', 'in_room', 'in_session', 'confirmed', 'not_confirmed', 'rescheduled', 'no_show')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum" USING "status"::"text"::"public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_billingstatus_enum" RENAME TO "Appointments_billingstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_billingstatus_enum" AS ENUM('paid', 'due', 'refund')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" TYPE "public"."Appointments_billingstatus_enum" USING "billingStatus"::"text"::"public"."Appointments_billingstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" SET DEFAULT 'due'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_billingstatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_billingstatus_enum_old" AS ENUM('due', 'paid')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" TYPE "public"."Appointments_billingstatus_enum_old" USING "billingStatus"::"text"::"public"."Appointments_billingstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "billingStatus" SET DEFAULT 'due'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_billingstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_billingstatus_enum_old" RENAME TO "Appointments_billingstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_status_enum_old" AS ENUM('cancelled', 'completed', 'initiated')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "public"."Appointments_status_enum_old" USING "status"::"text"::"public"."Appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "status" SET DEFAULT 'initiated'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_status_enum_old" RENAME TO "Appointments_status_enum"`);
    }

}
