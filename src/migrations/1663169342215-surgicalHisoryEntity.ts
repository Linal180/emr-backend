import {MigrationInterface, QueryRunner} from "typeorm";

export class surgicalHisoryEntity1663169342215 implements MigrationInterface {
    name = 'surgicalHisoryEntity1663169342215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SurgicalHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying, "codeType" character varying, "description" character varying, "surgeryDate" character varying, "notes" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_a7580f9415e48645017d0cbad20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "SurgicalHistory"`);
    }

}
