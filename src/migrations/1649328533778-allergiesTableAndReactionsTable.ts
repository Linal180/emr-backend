import {MigrationInterface, QueryRunner} from "typeorm";

export class allergiesTableAndReactionsTable1649328533778 implements MigrationInterface {
    name = 'allergiesTableAndReactionsTable1649328533778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Allergies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_f828c03d97287ce16fb394f9475" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Reactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_8e7a9226a42a2a796ce5993a5a2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Reactions"`);
        await queryRunner.query(`DROP TABLE "Allergies"`);
    }

}
