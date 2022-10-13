import {MigrationInterface, QueryRunner} from "typeorm";

export class changeNdcTable1665565293786 implements MigrationInterface {
    name = 'changeNdcTable1665565293786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NDC" DROP CONSTRAINT "FK_4cedba9c91897c464a705c6bc1f"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "mvxId"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "ndcCode"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "mvxName"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "mvxCode"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "gtin"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "lastUpdate"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "cvxDescription"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "ndcType"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "noUseNDC"`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "code" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "noUseNDC" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "cvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "ndcType" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "cvxDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "lastUpdate" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "gtin" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "endDate" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "startDate" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "mvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "mvxName" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "ndcCode" character varying`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD "mvxId" uuid`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD CONSTRAINT "FK_4cedba9c91897c464a705c6bc1f" FOREIGN KEY ("mvxId") REFERENCES "MVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
