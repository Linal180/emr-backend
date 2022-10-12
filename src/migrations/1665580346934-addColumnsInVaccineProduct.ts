import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsInVaccineProduct1665580346934 implements MigrationInterface {
    name = 'addColumnsInVaccineProduct1665580346934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "cvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "mvxCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "mvxCode"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "cvxCode"`);
    }

}
