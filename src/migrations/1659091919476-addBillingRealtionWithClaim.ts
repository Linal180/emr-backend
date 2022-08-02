import {MigrationInterface, QueryRunner} from "typeorm";

export class addBillingRealtionWithClaim1659091919476 implements MigrationInterface {
    name = 'addBillingRealtionWithClaim1659091919476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP CONSTRAINT "FK_8464ed44cf6c3be58b973d55257"`);
        await queryRunner.query(`ALTER TABLE "claim" RENAME COLUMN "claimStatusId" TO "billingId"`);
        await queryRunner.query(`ALTER TABLE "claim" RENAME CONSTRAINT "UQ_8464ed44cf6c3be58b973d55257" TO "UQ_4dcde52eb26f996a8748136af92"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD CONSTRAINT "FK_4dcde52eb26f996a8748136af92" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP CONSTRAINT "FK_4dcde52eb26f996a8748136af92"`);
        await queryRunner.query(`ALTER TABLE "claim" RENAME CONSTRAINT "UQ_4dcde52eb26f996a8748136af92" TO "UQ_8464ed44cf6c3be58b973d55257"`);
        await queryRunner.query(`ALTER TABLE "claim" RENAME COLUMN "billingId" TO "claimStatusId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD CONSTRAINT "FK_8464ed44cf6c3be58b973d55257" FOREIGN KEY ("claimStatusId") REFERENCES "claimStatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
