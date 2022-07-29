import {MigrationInterface, QueryRunner} from "typeorm";

export class eraIdInLiveClaim1658915676939 implements MigrationInterface {
    name = 'eraIdInLiveClaim1658915676939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "payerCity" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "eraId" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "paymentFormat" character varying`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" ADD "payerName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "payerName"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "paymentFormat"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "eraId"`);
        await queryRunner.query(`ALTER TABLE "LiveClaimFeed" DROP COLUMN "payerCity"`);
    }

}
