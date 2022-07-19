import {MigrationInterface, QueryRunner} from "typeorm";

export class claimStatusAndBillingRelation1658207865285 implements MigrationInterface {
    name = 'claimStatusAndBillingRelation1658207865285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "claimStatusId" uuid`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_a759b43ca1f3246e1c128e05ad9" FOREIGN KEY ("claimStatusId") REFERENCES "claimStatus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_a759b43ca1f3246e1c128e05ad9"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "claimStatusId"`);
    }

}
