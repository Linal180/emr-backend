import {MigrationInterface, QueryRunner} from "typeorm";

export class physicalExamAndAnswerResponsesRelation1666597325654 implements MigrationInterface {
    name = 'physicalExamAndAnswerResponsesRelation1666597325654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AnswerResponses" ADD "physicalExamId" uuid`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" ADD CONSTRAINT "FK_ce73ca402785c048370f9fccd7e" FOREIGN KEY ("physicalExamId") REFERENCES "ReviewOfSystem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AnswerResponses" DROP CONSTRAINT "FK_ce73ca402785c048370f9fccd7e"`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" DROP COLUMN "physicalExamId"`);
    }

}
