import {MigrationInterface, QueryRunner} from "typeorm";

export class sectionQuestionsEntity1665040842619 implements MigrationInterface {
    name = 'sectionQuestionsEntity1665040842619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sectionQuestions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "specialId" character varying, "note" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_5dfe9d68c1e98a0fac632ac60df" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sectionQuestions"`);
    }

}
