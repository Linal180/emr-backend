import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleEntityFlag1647843703681 implements MigrationInterface {
    name = 'RoleEntityFlag1647843703681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD "customRole" boolean DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "customRole"`);
    }

}
