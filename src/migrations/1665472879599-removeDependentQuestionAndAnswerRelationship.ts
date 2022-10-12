import {MigrationInterface, QueryRunner} from "typeorm";

export class removeDependentQuestionAndAnswerRelationship1665472879599 implements MigrationInterface {
    name = 'removeDependentQuestionAndAnswerRelationship1665472879599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP CONSTRAINT "FK_249402a455940c431985d9f64c4"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP CONSTRAINT "UQ_249402a455940c431985d9f64c4"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP COLUMN "dependentQuestionId"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD "dependentQuestionId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP COLUMN "dependentQuestionId"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD "dependentQuestionId" uuid`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD CONSTRAINT "UQ_249402a455940c431985d9f64c4" UNIQUE ("dependentQuestionId")`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD CONSTRAINT "FK_249402a455940c431985d9f64c4" FOREIGN KEY ("dependentQuestionId") REFERENCES "DependentQuestions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
