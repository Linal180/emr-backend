import {MigrationInterface, QueryRunner} from "typeorm";

export class questionTemplateEntity1665040204795 implements MigrationInterface {
    name = 'questionTemplateEntity1665040204795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "QuestionTemplate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "specialId" character varying, "templateType" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_2386a49c83fd5cf4e82661e583a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "QuestionTemplate"`);
    }

}
