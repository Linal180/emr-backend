import {MigrationInterface, QueryRunner} from "typeorm";

export class addedColumnsInQuestionAnswers1665042000975 implements MigrationInterface {
    name = 'addedColumnsInQuestionAnswers1665042000975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD "questionType" character varying`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD "options" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP COLUMN "options"`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP COLUMN "questionType"`);
    }

}
