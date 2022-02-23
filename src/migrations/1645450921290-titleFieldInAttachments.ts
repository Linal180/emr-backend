import {MigrationInterface, QueryRunner} from "typeorm";

export class titleFieldInAttachments1645450921290 implements MigrationInterface {
    name = 'titleFieldInAttachments1645450921290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "title"`);
    }

}
