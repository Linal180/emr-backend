import {MigrationInterface, QueryRunner} from "typeorm";

export class addImagingTest1667210636970 implements MigrationInterface {
    name = 'addImagingTest1667210636970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ImagingTest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_64e6ad9d9ee18d5eb5d1f7a24ff" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ImagingTest"`);
    }

}
