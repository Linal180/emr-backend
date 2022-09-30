import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsInSocialHistory1664538364207 implements MigrationInterface {
    name = 'AddColumnsInSocialHistory1664538364207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DependentQuestions" ADD "value" character varying`);
        await queryRunner.query(`ALTER TABLE "Questions" ADD "value" character varying`);
        await queryRunner.query(`ALTER TABLE "Sections" ADD "specialId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sections" DROP COLUMN "specialId"`);
        await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "DependentQuestions" DROP COLUMN "value"`);
    }

}
