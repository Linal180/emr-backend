import {MigrationInterface, QueryRunner} from "typeorm";

export class AgreementEntity1655708978464 implements MigrationInterface {
    name = 'AgreementEntity1655708978464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Agreements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "body" character varying, "signatureRequired" boolean DEFAULT false, "viewAgreementBeforeAgreeing" boolean DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_fb663e182007b64309137e96c28" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Agreements"`);
    }

}
