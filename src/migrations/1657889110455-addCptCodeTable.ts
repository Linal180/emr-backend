import {MigrationInterface, QueryRunner} from "typeorm";

export class addCptCodeTable1657889110455 implements MigrationInterface {
    name = 'addCptCodeTable1657889110455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CPTCodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying, "category" character varying, "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0f29cb920c7042941b21da12503" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "CPTCodes"`);
    }

}
