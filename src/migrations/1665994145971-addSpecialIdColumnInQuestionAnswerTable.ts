import {MigrationInterface, QueryRunner} from "typeorm";

export class addSpecialIdColumnInQuestionAnswerTable1665994145971 implements MigrationInterface {
    name = 'addSpecialIdColumnInQuestionAnswerTable1665994145971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD "specialId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP COLUMN "specialId"`);
    }

}
