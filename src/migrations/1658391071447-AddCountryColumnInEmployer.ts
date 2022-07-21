import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountryColumnInEmployer1658391071447 implements MigrationInterface {
    name = 'AddCountryColumnInEmployer1658391071447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ADD "country" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "country"`);
    }

}
