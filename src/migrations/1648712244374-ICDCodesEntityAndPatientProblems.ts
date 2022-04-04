import {MigrationInterface, QueryRunner} from "typeorm";

export class ICDCodesEntityAndPatientProblems1648712244374 implements MigrationInterface {
    name = 'ICDCodesEntityAndPatientProblems1648712244374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ICDCode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "description" character varying, "version" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_9fc87857fc1d26497b6e950d39e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PatientProblems" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_5b11fc8cc6401412ad5d8ea3120" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PatientProblems"`);
        await queryRunner.query(`DROP TABLE "ICDCode"`);
    }

}
