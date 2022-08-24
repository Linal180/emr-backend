import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCascadeFromFeeSchedule1661326840851 implements MigrationInterface {
    name = 'removeCascadeFromFeeSchedule1661326840851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP CONSTRAINT "FK_97af3534c5e1d2805726f799aa9"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_a759b43ca1f3246e1c128e05ad9"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD CONSTRAINT "FK_97af3534c5e1d2805726f799aa9" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_a759b43ca1f3246e1c128e05ad9" FOREIGN KEY ("claimStatusId") REFERENCES "claimStatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_a759b43ca1f3246e1c128e05ad9"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP CONSTRAINT "FK_97af3534c5e1d2805726f799aa9"`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_a759b43ca1f3246e1c128e05ad9" FOREIGN KEY ("claimStatusId") REFERENCES "claimStatus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD CONSTRAINT "FK_97af3534c5e1d2805726f799aa9" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
