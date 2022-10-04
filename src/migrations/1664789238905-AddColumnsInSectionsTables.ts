import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsInSectionsTables1664789238905 implements MigrationInterface {
    name = 'AddColumnsInSectionsTables1664789238905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DependentQuestions" ADD "specialId" character varying`);
        await queryRunner.query(`ALTER TABLE "Questions" ADD "specialId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "specialId"`);
        await queryRunner.query(`ALTER TABLE "DependentQuestions" DROP COLUMN "specialId"`);
    }

}
