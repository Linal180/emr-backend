import {MigrationInterface, QueryRunner} from "typeorm";

export class attachmentMetadataEntity1652852659602 implements MigrationInterface {
    name = 'attachmentMetadataEntity1652852659602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "AttachmentMetadata" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "metadataType" "public"."AttachmentMetadata_metadatatype_enum" NOT NULL, "labOrderNum" character varying, "assignedTo" character varying, "pending" boolean DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_48e5602a5e85320e7fd78ec31cb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "AttachmentMetadata"`);
    }

}
