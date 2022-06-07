import {MigrationInterface, QueryRunner} from "typeorm";

export class addContractInAppointmentPaymentType1654595435467 implements MigrationInterface {
    name = 'addContractInAppointmentPaymentType1654595435467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Appointments_paymenttype_enum" RENAME TO "Appointments_paymenttype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_paymenttype_enum" AS ENUM('self', 'Insurance', 'contract')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentType" TYPE "public"."Appointments_paymenttype_enum" USING "paymentType"::"text"::"public"."Appointments_paymenttype_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentType" SET DEFAULT 'self'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_paymenttype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_paymenttype_enum_old" AS ENUM('self', 'Insurance')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentType" TYPE "public"."Appointments_paymenttype_enum_old" USING "paymentType"::"text"::"public"."Appointments_paymenttype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ALTER COLUMN "paymentType" SET DEFAULT 'self'`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_paymenttype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Appointments_paymenttype_enum_old" RENAME TO "Appointments_paymenttype_enum"`);
    }

}
