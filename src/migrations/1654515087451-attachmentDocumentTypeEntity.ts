import {MigrationInterface, QueryRunner} from "typeorm";

export class attachmentDocumentTypeEntity1654515087451 implements MigrationInterface {
    name = 'attachmentDocumentTypeEntity1654515087451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DocumentType" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d4b25a21d456b14cde805e36724" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "DocumentType"`);
    }

}
