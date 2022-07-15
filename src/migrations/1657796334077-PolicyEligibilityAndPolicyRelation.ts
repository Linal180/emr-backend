import {MigrationInterface, QueryRunner} from "typeorm";

export class PolicyEligibilityAndPolicyRelation1657796334077 implements MigrationInterface {
    name = 'PolicyEligibilityAndPolicyRelation1657796334077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policyEligibility" ADD "policyId" uuid`);
        await queryRunner.query(`ALTER TABLE "policyEligibility" ADD CONSTRAINT "FK_9788382c5f6430e14432247dddb" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policyEligibility" DROP CONSTRAINT "FK_9788382c5f6430e14432247dddb"`);
        await queryRunner.query(`ALTER TABLE "policyEligibility" DROP COLUMN "policyId"`);
    }

}
