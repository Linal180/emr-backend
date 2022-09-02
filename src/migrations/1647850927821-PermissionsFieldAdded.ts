import {MigrationInterface, QueryRunner} from "typeorm";

export class PermissionsFieldAdded1647850927821 implements MigrationInterface {
    name = 'PermissionsFieldAdded1647850927821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permissions" ADD "moduleType" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permissions" DROP COLUMN "moduleType"`);
    }

}
