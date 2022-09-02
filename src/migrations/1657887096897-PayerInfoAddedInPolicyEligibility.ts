import {MigrationInterface, QueryRunner} from "typeorm";

export class PayerInfoAddedInPolicyEligibility1657887096897 implements MigrationInterface {
    name = 'PayerInfoAddedInPolicyEligibility1657887096897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policyEligibility" ADD "payerName" character varying`);
        await queryRunner.query(`ALTER TABLE "policyEligibility" ADD "payerId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policyEligibility" DROP COLUMN "payerId"`);
        await queryRunner.query(`ALTER TABLE "policyEligibility" DROP COLUMN "payerName"`);
    }

}
