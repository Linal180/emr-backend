import {MigrationInterface, QueryRunner} from "typeorm";

export class TemplateAndSectionRelation1665041807595 implements MigrationInterface {
    name = 'TemplateAndSectionRelation1665041807595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TemplateSections" ADD "templateId" uuid`);
        await queryRunner.query(`ALTER TABLE "TemplateSections" ADD CONSTRAINT "FK_e9e8e981663855eff62a9be126b" FOREIGN KEY ("templateId") REFERENCES "QuestionTemplate"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TemplateSections" DROP CONSTRAINT "FK_e9e8e981663855eff62a9be126b"`);
        await queryRunner.query(`ALTER TABLE "TemplateSections" DROP COLUMN "templateId"`);
    }

}
