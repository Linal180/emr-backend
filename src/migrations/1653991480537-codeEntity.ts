import {MigrationInterface, QueryRunner} from "typeorm";

export class codeEntity1653991480537 implements MigrationInterface {
    name = 'codeEntity1653991480537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Codes_codetype_enum" AS ENUM('Icd10 Code', 'Cpt Code', 'Hcpcs Code', 'Custom Code')`);
        await queryRunner.query(`CREATE TABLE "Codes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying, "description" character varying, "price" character varying, "codeType" "public"."Codes_codetype_enum" NOT NULL DEFAULT 'Custom Code', "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0b5a3b55a578f9487efa094c9ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Codes"`);
        await queryRunner.query(`DROP TYPE "public"."Codes_codetype_enum"`);
    }

}
