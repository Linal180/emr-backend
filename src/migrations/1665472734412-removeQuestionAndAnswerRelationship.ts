import {MigrationInterface, QueryRunner} from "typeorm";

export class removeQuestionAndAnswerRelationship1665472734412 implements MigrationInterface {
    name = 'removeQuestionAndAnswerRelationship1665472734412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP CONSTRAINT "FK_1ef8119fc6db74f895f19f115d8"`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP CONSTRAINT "UQ_1ef8119fc6db74f895f19f115d8"`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP COLUMN "questionId"`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD "questionId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP COLUMN "questionId"`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD "questionId" uuid`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD CONSTRAINT "UQ_1ef8119fc6db74f895f19f115d8" UNIQUE ("questionId")`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD CONSTRAINT "FK_1ef8119fc6db74f895f19f115d8" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
