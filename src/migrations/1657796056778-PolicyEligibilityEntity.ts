import {MigrationInterface, QueryRunner} from "typeorm";

export class PolicyEligibilityEntity1657796056778 implements MigrationInterface {
    name = 'PolicyEligibilityEntity1657796056778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "policyEligibility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eligibilityResultDate" character varying, "eligibilityResultTime" character varying, "eligibilityId" character varying, "groupNumber" character varying, "insAddress1" character varying, "insCity" character varying, "insDob" character varying, "insFirstName" character varying, "insLastName" character varying, "insSex" character varying, "insState" character varying, "insZip" character varying, "planBeginDate" character varying, "planNumber" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2f94b0a5aa235f21fda65a9e7b8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "policyEligibility"`);
    }

}
