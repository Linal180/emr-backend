import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnTypeInNdc1663851194959 implements MigrationInterface {
    name = 'changeColumnTypeInNdc1663851194959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD "cvxCode" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD "cvxCode" character varying`);
    }

}
