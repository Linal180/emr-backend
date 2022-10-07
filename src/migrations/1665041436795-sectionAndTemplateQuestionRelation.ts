import {MigrationInterface, QueryRunner} from "typeorm";

export class sectionAndTemplateQuestionRelation1665041436795 implements MigrationInterface {
    name = 'sectionAndTemplateQuestionRelation1665041436795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sectionQuestions" ADD "sectionId" uuid`);
        await queryRunner.query(`ALTER TABLE "sectionQuestions" ADD CONSTRAINT "FK_83e22977a4a179b225c0d9a6750" FOREIGN KEY ("sectionId") REFERENCES "TemplateSections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sectionQuestions" DROP CONSTRAINT "FK_83e22977a4a179b225c0d9a6750"`);
        await queryRunner.query(`ALTER TABLE "sectionQuestions" DROP COLUMN "sectionId"`);
    }

}
