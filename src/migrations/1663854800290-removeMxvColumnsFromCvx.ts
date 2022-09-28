import {MigrationInterface, QueryRunner} from "typeorm";

export class removeMxvColumnsFromCvx1663854800290 implements MigrationInterface {
    name = 'removeMxvColumnsFromCvx1663854800290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "mvxCode"`);
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "updateDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" ADD "updateDate" character varying`);
        await queryRunner.query(`ALTER TABLE "CVX" ADD "mvxCode" character varying`);
    }

}
