import {MigrationInterface, QueryRunner} from "typeorm";

export class policyEntityAdded1653561966756 implements MigrationInterface {
    name = 'policyEntityAdded1653561966756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."policies_orderofbenifit_enum" AS ENUM('Primary', 'Secondary', 'Tertiary')`);
        await queryRunner.query(`CREATE TYPE "public"."policies_policyholderrelationship_enum" AS ENUM('Self', 'Spouse', 'Child', 'Child (Mother''s Insurance)', 'Child (Father''s Insurance)', 'Other', 'Grandparent', 'Grandchild', 'Nephew or Niece', 'Foster Child', 'Ward', 'Stepson or Stepdaughter', 'Stepson or Stepdaughter (Stepmother''s Insurance)', 'Stepson or Stepdaughter (Stepfather''s Insurance)', 'Employee', 'Unknown', 'Handicapped Dependent', 'Sponsored Dependent', 'Dependent of a Minor Dependent', 'Significant Other', 'Mother', 'Father', 'Emancipated Minor', 'Organ Donor', 'Cadaver Donor', 'Injured Plaintiff', 'Child (Ins. not Financially Respons.)', 'Child (Mother''s Ins., Ins. not Financially Respons.)', 'Child (Father''s Ins., Ins. not Financially Respons.)', 'Life Partner')`);
        await queryRunner.query(`CREATE TYPE "public"."policies_pricingproducttype_enum" AS ENUM('Automobile Medical', 'Blue Cross/Blue Shield', 'Champus', 'Commercial Insurance Co.', 'Dental Maintenance Organization', 'Disability', 'Exclusive Provider Organization (EPO)', 'Federal Employees Program', 'Health Maintenance Organization', 'Health Maintenance Organization (HMO) Medicare Risk', 'Indemnity Insurance', 'Liability Medical', 'Medicaid', 'Medicare Part A', 'Medicare Part B', 'Mutually Defined', 'Other Federal Program', 'Other Non-Federal Programs', 'Point of Service (POS)', 'Preferred Provider Organization (PPO)', 'Title V', 'Veterans Affairs Plan', 'Workers'' Compensation Health Claim')`);
        await queryRunner.query(`CREATE TABLE "policies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "orderOfBenifit" "public"."policies_orderofbenifit_enum" NOT NULL DEFAULT 'Primary', "policyHolderRelationship" "public"."policies_policyholderrelationship_enum" NOT NULL DEFAULT 'Self', "memberId" character varying, "groupNumber" character varying, "issueDate" character varying, "expirationDate" character varying, "coinsurancePercentage" character varying, "pricingProductType" "public"."policies_pricingproducttype_enum" NOT NULL DEFAULT 'Automobile Medical', "notes" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_603e09f183df0108d8695c57e28" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "policies"`);
        await queryRunner.query(`DROP TYPE "public"."policies_pricingproducttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policies_policyholderrelationship_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policies_orderofbenifit_enum"`);
    }

}
