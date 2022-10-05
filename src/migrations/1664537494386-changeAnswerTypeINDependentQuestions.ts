import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAnswerTypeINDependentQuestions1664537494386 implements MigrationInterface {
    name = 'changeAnswerTypeINDependentQuestions1664537494386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DependentQuestions" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "DependentQuestions" ADD "answer" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DependentQuestions" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "DependentQuestions" ADD "answer" character varying`);
    }

}
