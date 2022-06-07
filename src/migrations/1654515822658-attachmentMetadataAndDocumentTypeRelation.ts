import {MigrationInterface, QueryRunner} from "typeorm";

export class attachmentMetadataAndDocumentTypeRelation1654515822658 implements MigrationInterface {
    name = 'attachmentMetadataAndDocumentTypeRelation1654515822658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" RENAME COLUMN "metadataType" TO "documentTypeId"`);
        await queryRunner.query(`ALTER TYPE "public"."AttachmentMetadata_metadatatype_enum" RENAME TO "AttachmentMetadata_documenttypeid_enum"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "documentTypeId"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "documentTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD CONSTRAINT "FK_3623e981020754e37860c2189c3" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP CONSTRAINT "FK_3623e981020754e37860c2189c3"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "documentTypeId"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "documentTypeId" "public"."AttachmentMetadata_documenttypeid_enum" NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."AttachmentMetadata_documenttypeid_enum" RENAME TO "AttachmentMetadata_metadatatype_enum"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" RENAME COLUMN "documentTypeId" TO "metadataType"`);
    }

}
