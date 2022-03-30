import {MigrationInterface, QueryRunner} from "typeorm";

export class addFacilityIdInInvoiceTable1647501561340 implements MigrationInterface {
    name = 'addFacilityIdInInvoiceTable1647501561340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ADD "facilityId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" DROP COLUMN "facilityId"`);
    }

}
