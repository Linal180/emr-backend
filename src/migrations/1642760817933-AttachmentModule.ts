import {MigrationInterface, QueryRunner} from "typeorm";

export class AttachmentModule1642760817933 implements MigrationInterface {
    name = 'AttachmentModule1642760817933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Attachments_type_enum" AS ENUM('patient', 'doctor', 'lab')`);
        await queryRunner.query(`CREATE TABLE "Attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."Attachments_type_enum" NOT NULL DEFAULT 'patient', "typeId" character varying NOT NULL, "key" character varying, "url" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ef61cd830586786fddce1c466a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Attachments"`);
        await queryRunner.query(`DROP TYPE "public"."Attachments_type_enum"`);
    }

}
