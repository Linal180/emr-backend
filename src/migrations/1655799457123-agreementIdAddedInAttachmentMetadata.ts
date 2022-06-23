import {MigrationInterface, QueryRunner} from "typeorm";

export class agreementIdAddedInAttachmentMetadata1655799457123 implements MigrationInterface {
    name = 'agreementIdAddedInAttachmentMetadata1655799457123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "agreementId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "agreementId"`);
    }

}
