import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationShip1664866975007 implements MigrationInterface {
    name = 'addRelationShip1664866975007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD "dependentQuestionId" uuid`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD CONSTRAINT "UQ_249402a455940c431985d9f64c4" UNIQUE ("dependentQuestionId")`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD "questionId" uuid`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD CONSTRAINT "UQ_1ef8119fc6db74f895f19f115d8" UNIQUE ("questionId")`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD CONSTRAINT "FK_249402a455940c431985d9f64c4" FOREIGN KEY ("dependentQuestionId") REFERENCES "DependentQuestions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD CONSTRAINT "FK_1ef8119fc6db74f895f19f115d8" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP CONSTRAINT "FK_1ef8119fc6db74f895f19f115d8"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP CONSTRAINT "FK_249402a455940c431985d9f64c4"`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP CONSTRAINT "UQ_1ef8119fc6db74f895f19f115d8"`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP COLUMN "questionId"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP CONSTRAINT "UQ_249402a455940c431985d9f64c4"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP COLUMN "dependentQuestionId"`);
    }

}
