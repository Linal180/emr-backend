import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewColumnInAttachment1661150423172 implements MigrationInterface {
    name = 'addNewColumnInAttachment1661150423172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "parentAttachmentId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "parentAttachmentId"`);
    }

}
