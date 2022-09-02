import {MigrationInterface, QueryRunner} from "typeorm";

export class descriptionFieldInRoles1648647244077 implements MigrationInterface {
    name = 'descriptionFieldInRoles1648647244077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "description"`);
    }

}
