import {MigrationInterface, QueryRunner} from "typeorm";

export class macrosEntity1666604363096 implements MigrationInterface {
    name = 'macrosEntity1666604363096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Macros" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expansion" character varying NOT NULL, "providers" character varying NOT NULL, "section" character varying, "shortcut" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ee0cc5925a7052063162185562e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Macros"`);
    }

}
