import {MigrationInterface, QueryRunner} from "typeorm";

export class upFrontPaymentColumns1664273811720 implements MigrationInterface {
    name = 'upFrontPaymentColumns1664273811720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" DROP COLUMN "UpFrontPaymentId"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD "totalCharges" character varying`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD "expected" character varying`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD "balance" character varying`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD "paid" character varying`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD "adjustments" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP COLUMN "adjustments"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP COLUMN "paid"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP COLUMN "expected"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP COLUMN "totalCharges"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" ADD "UpFrontPaymentId" character varying`);
    }

}
