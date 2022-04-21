import {MigrationInterface, QueryRunner} from "typeorm";

export class LabTestsEntity1650532587341 implements MigrationInterface {
    name = 'LabTestsEntity1650532587341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "LabTests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_aa33bb491d8bf02992ec6fe7405" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "LabTests"`);
    }

}
