import {MigrationInterface, QueryRunner} from "typeorm";

export class AttachmentModuleNewFields1648204899648 implements MigrationInterface {
    name = 'AttachmentModuleNewFields1648204899648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "attachmentName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "attachmentName"`);
    }

}
