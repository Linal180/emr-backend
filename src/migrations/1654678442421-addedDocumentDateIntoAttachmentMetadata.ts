import {MigrationInterface, QueryRunner} from "typeorm";

export class addedDocumentDateIntoAttachmentMetadata1654678442421 implements MigrationInterface {
    name = 'addedDocumentDateIntoAttachmentMetadata1654678442421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "documentDate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "documentDate"`);
    }

}
