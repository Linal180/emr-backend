import {MigrationInterface, QueryRunner} from "typeorm";

export class addFormTemplateEntity1650535497476 implements MigrationInterface {
    name = 'addFormTemplateEntity1650535497476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FormTemplate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "layout" jsonb NOT NULL, CONSTRAINT "PK_fc9e89f28d73f75e65c95007eb0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "FormTemplate"`);
    }

}
