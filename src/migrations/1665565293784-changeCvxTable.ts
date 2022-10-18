import {MigrationInterface, QueryRunner} from "typeorm";

export class changeCvxTable1665565293784 implements MigrationInterface {
    name = 'changeCvxTable1665565293784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "productStatus"`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "shortDescription"`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "shortDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "cvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "notes" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "shortDescription"`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "cvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "shortDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "productStatus" character varying`);
    }

}
