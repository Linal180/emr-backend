import {MigrationInterface, QueryRunner} from "typeorm";

export class taxIdAndNpiAddedInPractice1657091069520 implements MigrationInterface {
    name = 'taxIdAndNpiAddedInPractice1657091069520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Practice" ADD "taxId" character varying`);
        await queryRunner.query(`ALTER TABLE "Practice" ADD "npi" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Practice" DROP COLUMN "npi"`);
        await queryRunner.query(`ALTER TABLE "Practice" DROP COLUMN "taxId"`);
    }

}
