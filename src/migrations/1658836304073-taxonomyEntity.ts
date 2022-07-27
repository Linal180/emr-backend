import {MigrationInterface, QueryRunner} from "typeorm";

export class taxonomyEntity1658836304073 implements MigrationInterface {
    name = 'taxonomyEntity1658836304073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taxonomies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "classification" character varying NOT NULL, "specialization" character varying, "definition" character varying NOT NULL, "notes" character varying, "displayName" character varying, "section" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_f8c39bce97175559a2223be37f6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "taxonomies"`);
    }

}
