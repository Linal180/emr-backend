import {MigrationInterface, QueryRunner} from "typeorm";

export class AttachmentModuleNewFieldsAdded1648205009066 implements MigrationInterface {
    name = 'AttachmentModuleNewFieldsAdded1648205009066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "providerName" character varying`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "comments" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "providerName"`);
    }

}
