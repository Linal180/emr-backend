import {MigrationInterface, QueryRunner} from "typeorm";

export class addLabelInFormElement1650353485497 implements MigrationInterface {
    name = 'addLabelInFormElement1650353485497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" RENAME COLUMN "tableName" TO "label"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" RENAME COLUMN "label" TO "tableName"`);
    }

}
