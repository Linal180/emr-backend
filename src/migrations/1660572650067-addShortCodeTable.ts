import {MigrationInterface, QueryRunner} from "typeorm";

export class addShortCodeTable1660572650067 implements MigrationInterface {
    name = 'addShortCodeTable1660572650067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ShortUrl" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortLink" character varying, "longLink" character varying, "urlCode" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_883ad2ba52d32d2deb27168f3e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ShortUrl"`);
    }

}
