import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionAndAnswerRelation1665041618717 implements MigrationInterface {
    name = 'QuestionAndAnswerRelation1665041618717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD "questionsId" uuid`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD CONSTRAINT "FK_e883bcb55f00389cc784864c043" FOREIGN KEY ("questionsId") REFERENCES "sectionQuestions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP CONSTRAINT "FK_e883bcb55f00389cc784864c043"`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP COLUMN "questionsId"`);
    }

}
