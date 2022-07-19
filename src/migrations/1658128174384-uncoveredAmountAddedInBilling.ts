import {MigrationInterface, QueryRunner} from "typeorm";

export class uncoveredAmountAddedInBilling1658128174384 implements MigrationInterface {
    name = 'uncoveredAmountAddedInBilling1658128174384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" RENAME COLUMN "patientBillingStatus" TO "uncoveredAmount"`);
        await queryRunner.query(`ALTER TYPE "public"."Billings_patientbillingstatus_enum" RENAME TO "Billings_uncoveredamount_enum"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "uncoveredAmount"`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "uncoveredAmount" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "uncoveredAmount"`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "uncoveredAmount" "public"."Billings_uncoveredamount_enum" NOT NULL DEFAULT 'Balance Due'`);
        await queryRunner.query(`ALTER TYPE "public"."Billings_uncoveredamount_enum" RENAME TO "Billings_patientbillingstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "Billings" RENAME COLUMN "uncoveredAmount" TO "patientBillingStatus"`);
    }

}
