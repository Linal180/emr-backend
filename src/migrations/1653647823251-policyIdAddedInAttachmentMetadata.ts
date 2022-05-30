import {MigrationInterface, QueryRunner} from "typeorm";

export class policyIdAddedInAttachmentMetadata1653647823251 implements MigrationInterface {
    name = 'policyIdAddedInAttachmentMetadata1653647823251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" ADD "policyId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttachmentMetadata" DROP COLUMN "policyId"`);
    }

}
