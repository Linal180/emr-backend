import {MigrationInterface, QueryRunner} from "typeorm";

export class policyHolderAndPolicyRelation1653565541517 implements MigrationInterface {
    name = 'policyHolderAndPolicyRelation1653565541517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" ADD "policyHolderId" uuid`);
        await queryRunner.query(`ALTER TABLE "policies" ADD CONSTRAINT "FK_4a36444d078bcd790ac82b0d32b" FOREIGN KEY ("policyHolderId") REFERENCES "policyHolder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" DROP CONSTRAINT "FK_4a36444d078bcd790ac82b0d32b"`);
        await queryRunner.query(`ALTER TABLE "policies" DROP COLUMN "policyHolderId"`);
    }

}
