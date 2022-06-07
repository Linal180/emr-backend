import {MigrationInterface, QueryRunner} from "typeorm";

export class moveColumnsFromAttachmentsToAttachmentMeta1654605711075 implements MigrationInterface {
    name = 'moveColumnsFromAttachmentsToAttachmentMeta1654605711075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "pending"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "providerName"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "signedBy"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "signedAt"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "providerName" character varying`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "signedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "signedAt" character varying`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "comments" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "signedAt"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "signedBy"`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "providerName"`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "signedAt" character varying`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "signedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "comments" character varying`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "providerName" character varying`);
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "pending" boolean DEFAULT true`);
    }

}
