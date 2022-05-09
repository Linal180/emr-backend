import {MigrationInterface, QueryRunner} from "typeorm";

export class ObservationsAndLoincCodeRelations1650543391622 implements MigrationInterface {
    name = 'ObservationsAndLoincCodeRelations1650543391622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Observations" ADD "loincCodesId" uuid`);
        await queryRunner.query(`ALTER TABLE "Observations" ADD CONSTRAINT "FK_ee49a8f9ddc8b26da6adb0896d6" FOREIGN KEY ("loincCodesId") REFERENCES "LoincCodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Observations" DROP CONSTRAINT "FK_ee49a8f9ddc8b26da6adb0896d6"`);
        await queryRunner.query(`ALTER TABLE "Observations" DROP COLUMN "loincCodesId"`);
    }

}
