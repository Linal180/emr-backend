import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedEmployerEntity1641911735234 implements MigrationInterface {
    name = 'AddedEmployerEntity1641911735234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Employers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying, "phone" character varying, "mobile" character varying, "industry" character varying, "usualOccupation" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4415c17ee61fc17cc0a0cfd1d43" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Employers"`);
    }

}
