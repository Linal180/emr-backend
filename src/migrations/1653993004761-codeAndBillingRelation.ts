import {MigrationInterface, QueryRunner} from "typeorm";

export class codeAndBillingRelation1653993004761 implements MigrationInterface {
    name = 'codeAndBillingRelation1653993004761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Codes" ADD "billingId" uuid`);
        await queryRunner.query(`ALTER TABLE "Codes" ADD CONSTRAINT "FK_c7eda02d4f9fe4c9e42f20e5a55" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Codes" DROP CONSTRAINT "FK_c7eda02d4f9fe4c9e42f20e5a55"`);
        await queryRunner.query(`ALTER TABLE "Codes" DROP COLUMN "billingId"`);
    }

}
