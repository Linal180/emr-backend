import {MigrationInterface, QueryRunner} from "typeorm";

export class attachmentAndAttachmentMetadataRelation1652882069460 implements MigrationInterface {
    name = 'attachmentAndAttachmentMetadataRelation1652882069460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "attachmentMetadataId" uuid`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD CONSTRAINT "UQ_b077b5096d82b659329d5caff2b" UNIQUE ("attachmentMetadataId")`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD CONSTRAINT "FK_b077b5096d82b659329d5caff2b" FOREIGN KEY ("attachmentMetadataId") REFERENCES "AttachmentMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP CONSTRAINT "FK_b077b5096d82b659329d5caff2b"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP CONSTRAINT "UQ_b077b5096d82b659329d5caff2b"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "attachmentMetadataId"`);
    }

}
