import {MigrationInterface, QueryRunner} from "typeorm";

export class addedColumnsUpFrontPaymentType1664804730803 implements MigrationInterface {
    name = 'addedColumnsUpFrontPaymentType1664804730803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" ADD "dueAmount" character varying`);
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" ADD "copayType" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" DROP COLUMN "copayType"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" DROP COLUMN "dueAmount"`);
    }

}
