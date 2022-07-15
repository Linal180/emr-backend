import {MigrationInterface, QueryRunner} from "typeorm";

export class PolicyCoverageAndPolicyEligibilityRelation1657798130831 implements MigrationInterface {
    name = 'PolicyCoverageAndPolicyEligibilityRelation1657798130831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policyCoverage" ADD "policyEligibilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "policyCoverage" ADD CONSTRAINT "FK_3c83a112ffb2f53c012254b0c5f" FOREIGN KEY ("policyEligibilityId") REFERENCES "policyEligibility"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policyCoverage" DROP CONSTRAINT "FK_3c83a112ffb2f53c012254b0c5f"`);
        await queryRunner.query(`ALTER TABLE "policyCoverage" DROP COLUMN "policyEligibilityId"`);
    }

}
