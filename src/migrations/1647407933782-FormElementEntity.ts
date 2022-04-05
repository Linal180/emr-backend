import {MigrationInterface, QueryRunner} from "typeorm";

export class FormElementEntity1647407933782 implements MigrationInterface {
    name = 'FormElementEntity1647407933782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FormElements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "placeholder" character varying NOT NULL, "defaultValue" character varying, "required" boolean DEFAULT false, "errorMsg" character varying NOT NULL, "position" character varying NOT NULL, "tableName" character varying NOT NULL, "columnName" character varying NOT NULL, "fieldId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_6d1055df4522d3f569d6a6f451e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "FormElements"`);
    }

}
