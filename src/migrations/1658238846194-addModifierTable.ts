import {MigrationInterface, QueryRunner} from "typeorm";

export class addModifierTable1658238846194 implements MigrationInterface {
    name = 'addModifierTable1658238846194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Modifier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying, "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_cef1fa3e7d31ae84938ce5ee679" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Modifier"`);
    }

}
