import {MigrationInterface, QueryRunner} from "typeorm";

export class AdditionalFieldsInLiveClaim1658914170034 implements MigrationInterface {
    name = 'AdditionalFieldsInLiveClaim1658914170034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "paidAmount" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "provAccount" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "payerAccount" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "provZip" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "paymentMethod" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "provName" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "payerId" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "checkNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "checkNumber"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "payerId"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "provName"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "paymentMethod"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "provZip"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "payerAccount"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "provAccount"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "paidAmount"`);
    }

}
