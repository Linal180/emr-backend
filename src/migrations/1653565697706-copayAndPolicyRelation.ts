import {MigrationInterface, QueryRunner} from "typeorm";

export class copayAndPolicyRelation1653565697706 implements MigrationInterface {
    name = 'copayAndPolicyRelation1653565697706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "copays" ADD "policyId" uuid`);
        await queryRunner.query(`ALTER TABLE "copays" ADD CONSTRAINT "FK_574c645a35933f2234e04bc291c" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "copays" DROP CONSTRAINT "FK_574c645a35933f2234e04bc291c"`);
        await queryRunner.query(`ALTER TABLE "copays" DROP COLUMN "policyId"`);
    }

}
