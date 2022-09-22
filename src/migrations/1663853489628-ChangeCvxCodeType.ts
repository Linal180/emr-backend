import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCvxCodeType1663853489628 implements MigrationInterface {
    name = 'ChangeCvxCodeType1663853489628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "cvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "noUseNDC"`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "noUseNDC" character varying`);
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD "cvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "cvxCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "cvxCode" double precision`);
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD "cvxCode" double precision`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "noUseNDC"`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "noUseNDC" double precision`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "cvxCode" double precision`);
    }

}
