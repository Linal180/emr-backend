import {MigrationInterface, QueryRunner} from "typeorm";

export class ExerciseRelation1669187126118 implements MigrationInterface {
    name = 'ExerciseRelation1669187126118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Exercises" ADD "templateId" uuid`);
        await queryRunner.query(`ALTER TABLE "Exercises" ADD CONSTRAINT "FK_344b77528cca9301a777b004d5c" FOREIGN KEY ("templateId") REFERENCES "QuestionTemplate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Exercises" DROP CONSTRAINT "FK_344b77528cca9301a777b004d5c"`);
        await queryRunner.query(`ALTER TABLE "Exercises" DROP COLUMN "templateId"`);
    }

}
