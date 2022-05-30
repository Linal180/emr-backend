import {MigrationInterface, QueryRunner} from "typeorm";

export class insurancesAndContactRelationAdded1653487135518 implements MigrationInterface {
    name = 'insurancesAndContactRelationAdded1653487135518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" ADD "insuranceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_f7ee6697ceda0ef00ad4f132aae" FOREIGN KEY ("insuranceId") REFERENCES "Insurances"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_f7ee6697ceda0ef00ad4f132aae"`);
        await queryRunner.query(`ALTER TABLE "Contacts" DROP COLUMN "insuranceId"`);
    }

}
