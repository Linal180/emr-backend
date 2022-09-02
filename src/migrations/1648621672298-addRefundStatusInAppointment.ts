import {MigrationInterface, QueryRunner} from "typeorm";

export class addRefundStatusInAppointment1648621672298 implements MigrationInterface {
    name = 'addRefundStatusInAppointment1648621672298'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}
