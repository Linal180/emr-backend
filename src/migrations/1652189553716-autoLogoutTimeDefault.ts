import {MigrationInterface, QueryRunner} from "typeorm";

export class autoLogoutTimeDefault1652189553716 implements MigrationInterface {
    name = 'autoLogoutTimeDefault1652189553716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "autoLogoutTime" SET DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "autoLogoutTime" DROP DEFAULT`);
    }

}
