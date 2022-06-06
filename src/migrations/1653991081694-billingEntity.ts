import {MigrationInterface, QueryRunner} from "typeorm";

export class billingEntity1653991081694 implements MigrationInterface {
    name = 'billingEntity1653991081694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Billings_patientpaymenttype_enum" AS ENUM('Insurance', 'No Insurance')`);
        await queryRunner.query(`CREATE TYPE "public"."Billings_patientbillingstatus_enum" AS ENUM('Paid In Full', 'Balance Due', 'Settled', 'Internal Review', 'Bill Insurance', 'Bill Secondary Insurance', 'Worker''s Comp Claim', 'Auto Accident Claim', 'Durable Medical Equipment Claim')`);
        await queryRunner.query(`CREATE TYPE "public"."Billings_onsetdatetype_enum" AS ENUM('Onset of Current Symptoms or Illness', 'Date of Accident', 'Last Menstrual Period')`);
        await queryRunner.query(`CREATE TYPE "public"."Billings_otherdatetype_enum" AS ENUM('Initial Visit Date', 'Initial Treatment Date', 'Last Related Visit')`);
        await queryRunner.query(`CREATE TABLE "Billings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientPaymentType" "public"."Billings_patientpaymenttype_enum" NOT NULL DEFAULT 'No Insurance', "patientBillingStatus" "public"."Billings_patientbillingstatus_enum" NOT NULL DEFAULT 'Balance Due', "amount" character varying, "onsetDateType" "public"."Billings_onsetdatetype_enum" NOT NULL DEFAULT 'Onset of Current Symptoms or Illness', "onsetDate" character varying, "otherDateType" "public"."Billings_otherdatetype_enum" NOT NULL DEFAULT 'Initial Visit Date', "otherDate" character varying, "employment" boolean DEFAULT false, "autoAccident" boolean DEFAULT false, "otherAccident" boolean DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_aa0708fd07d51828ce4eb91e59a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Billings"`);
        await queryRunner.query(`DROP TYPE "public"."Billings_otherdatetype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Billings_onsetdatetype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Billings_patientbillingstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Billings_patientpaymenttype_enum"`);
    }

}
