import {MigrationInterface, QueryRunner} from "typeorm";

export class billingAndFeeScheduleRelation1658494730212 implements MigrationInterface {
    name = 'billingAndFeeScheduleRelation1658494730212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "feeScheduleId" uuid`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_5be0f479c5cc4fd3615c2604010" FOREIGN KEY ("feeScheduleId") REFERENCES "FeeSchedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_5be0f479c5cc4fd3615c2604010"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "feeScheduleId"`);
    }

}
