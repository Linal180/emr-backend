import {MigrationInterface, QueryRunner} from "typeorm";

export class isTwoFactorEnabledField1648551859609 implements MigrationInterface {
    name = 'isTwoFactorEnabledField1648551859609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "isTwoFactorEnabled" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "isTwoFactorEnabled"`);
    }

}
