import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityFieldsRemoved1646045528052 implements MigrationInterface {
    name = 'FacilityFieldsRemoved1646045528052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "revenueCode"`);
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "insurancePlanType"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "insurancePlanType" character varying`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "code" character varying`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "revenueCode" character varying`);
    }

}
