import {MigrationInterface, QueryRunner} from "typeorm";

export class PolicyCoverageEntity1657796574923 implements MigrationInterface {
    name = 'PolicyCoverageEntity1657796574923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "policyCoverage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "benefitCode" character varying, "benefitCoverageCode" character varying, "benefitCoverageDescription" character varying, "benefitDescription" character varying, "benefitNotes" character varying, "dateOfLastUpdated" character varying, "benefitLevelCode" character varying, "benefitLevelCodeDescription" character varying, "benefitPeriodCode" character varying, "benefitPeriodCodeDescription" character varying, "inPlanNetwork" character varying, "benefitAmount" character varying, "insuranceTypeCode" character varying, "insuranceTypeCodeDescription" character varying, "benefitPercent" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6fcb834878af4bc6728d21d5b65" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "policyCoverage"`);
    }

}
