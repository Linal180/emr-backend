import {MigrationInterface, QueryRunner} from "typeorm";

export class changeInsuranceColumns1658730463729 implements MigrationInterface {
    name = 'changeInsuranceColumns1658730463729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "enrollmentRequired"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "realTimeEligibility"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "realTimeClaimStatus"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "lineOfBusiness"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "Note"`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "workersComp" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "ubClaims" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "eligibility" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "claimFee" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "remitFee" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "attachment" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."Insurances_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "type" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "electronicRemittanceAdvice"`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "electronicRemittanceAdvice" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "secondaryCoordinationBenefits"`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "secondaryCoordinationBenefits" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "secondaryCoordinationBenefits"`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "secondaryCoordinationBenefits" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "electronicRemittanceAdvice"`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "electronicRemittanceAdvice" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."Insurances_type_enum" AS ENUM('Non-Par', 'Par')`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "type" "public"."Insurances_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "attachment"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "remitFee"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "claimFee"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "eligibility"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "ubClaims"`);
        await queryRunner.query(`ALTER TABLE "Insurances" DROP COLUMN "workersComp"`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "Note" character varying`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "lineOfBusiness" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "realTimeClaimStatus" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "realTimeEligibility" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD "enrollmentRequired" boolean DEFAULT false`);
    }

}
