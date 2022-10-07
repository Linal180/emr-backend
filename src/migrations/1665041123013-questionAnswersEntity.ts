import {MigrationInterface, QueryRunner} from "typeorm";

export class questionAnswersEntity1665041123013 implements MigrationInterface {
    name = 'questionAnswersEntity1665041123013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "QuestionAnswers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "answerType" character varying, "note" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_ff55c6242ea29752abb4c703988" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "QuestionAnswers"`);
    }

}
