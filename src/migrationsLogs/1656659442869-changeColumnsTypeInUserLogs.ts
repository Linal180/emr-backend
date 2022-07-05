import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnsTypeInUserLogs1656659442869 implements MigrationInterface {
    name = 'changeColumnsTypeInUserLogs1656659442869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "reqInfo"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "reqInfo" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "resInfo"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "resInfo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "resInfo"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "resInfo" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "reqInfo"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "reqInfo" jsonb NOT NULL`);
    }

}
