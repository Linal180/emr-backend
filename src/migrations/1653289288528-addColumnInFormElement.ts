import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInFormElement1653289288528 implements MigrationInterface {
    name = 'addColumnInFormElement1653289288528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "tableName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "tableName"`);
    }

}
