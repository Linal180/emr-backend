import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableContactTypeInFormElements1653890712081 implements MigrationInterface {
    name = 'addTableContactTypeInFormElements1653890712081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "tableContactType" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "tableContactType"`);
    }

}
