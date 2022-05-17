import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoLogoutTimeInUser1652178088808 implements MigrationInterface {
    name = 'AutoLogoutTimeInUser1652178088808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "autoLogoutTime" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "autoLogoutTime"`);
    }

}
