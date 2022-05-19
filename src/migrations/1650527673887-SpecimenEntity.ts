import {MigrationInterface, QueryRunner} from "typeorm";

export class SpecimenEntity1650527673887 implements MigrationInterface {
    name = 'SpecimenEntity1650527673887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SpecimenTypes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0e92bc5281e78d27979cc09f32a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "SpecimenTypes"`);
    }

}
